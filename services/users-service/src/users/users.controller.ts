import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDTO, UserDTO } from './users.models';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: UserCreateDTO): Promise<UserDTO> {
    return this.usersService.createUser(user);
  }

  @Get()
  getUsers(): Promise<UserDTO[]> {
    return this.usersService.getUsers();
  }
}
