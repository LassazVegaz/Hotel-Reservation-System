import { Injectable, NotFoundException } from '@nestjs/common';
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
