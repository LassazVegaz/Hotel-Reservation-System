import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { UserCreateDTO, UserDTO } from './users.models';

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
   * Create user DTO without unnecessary fields
   */
  private createUserDTO(user: User): UserDTO {
    const { password, ...userDTO } = user;
    return userDTO;
  }
}
