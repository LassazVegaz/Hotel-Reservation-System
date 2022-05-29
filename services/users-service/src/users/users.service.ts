import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { UserCreateDTO, UserDTO, UserUpdateDTO } from './users.models';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Create a user
   * @param user without ID
   * @returns Newly created user
   */
  async createUser(user: UserCreateDTO): Promise<UserDTO> {
    const salt = Number(process.env.SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;

    const newUser = await this.prismaService.user.create({
      data: user,
    });

    // send user DTO
    return this.createUserDTO(newUser);
  }

  /**
   * Get all users
   * @returns All users
   */
  async getUsers(): Promise<UserDTO[]> {
    const users = await this.prismaService.user.findMany();

    // send user DTOs
    return users.map((user) => this.createUserDTO(user));
  }

  /**
   * Get user by ID
   */
  async getUser(id: number): Promise<UserDTO> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    // send user DTO
    return this.createUserDTO(user);
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    // send user DTO
    return this.createUserDTO(user);
  }

  private async getPassword(id: number): Promise<string> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user.password;
  }

  async isPasswordCorrect(id: number, password: string): Promise<boolean> {
    const passwordHash = await this.getPassword(id);
    return bcrypt.compare(password, passwordHash);
  }

  /**
   * Update user
   */
  async updateUser(id: number, user: UserUpdateDTO): Promise<UserDTO> {
    // check if user exists
    if (!(await this.userExists(id)))
      throw new NotFoundException(`User with ID ${id} not found`);

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: user,
    });

    // send user DTO
    return this.createUserDTO(updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    // check if user exists
    if (!(await this.userExists(id)))
      throw new NotFoundException(`User with ID ${id} not found`);

    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Create user DTO without unnecessary fields
   */
  private createUserDTO(user: User): UserDTO {
    if (!user) return null;

    const { password, ...userDTO } = user;
    return userDTO;
  }

  /**
   * Check if user exists
   */
  private async userExists(id: number): Promise<boolean> {
    const user = await this.getUser(id);
    return Boolean(user);
  }
}
