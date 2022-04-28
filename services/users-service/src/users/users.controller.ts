import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDTO> {
    return this.usersService.getUser(parseInt(id));
  }
}
