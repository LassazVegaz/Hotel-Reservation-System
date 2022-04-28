import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserCreateDTO } from './users.models';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: UserCreateDTO): Promise<User> {
    return this.usersService.createUser(user);
  }
}
