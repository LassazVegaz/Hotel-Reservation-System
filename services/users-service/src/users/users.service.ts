import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { UserCreateDTO } from './users.models';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Create a user
   * @param user without ID
   * @returns Newly created user
   */
  async createUser(user: UserCreateDTO): Promise<User> {
    return await this.prismaService.user.create({
      data: user,
    });
  }
}
