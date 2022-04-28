import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserCreateDTO, UserDTO, UserUpdateDTO } from './users.models';
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
    const user = this.usersService.getUser(parseInt(id));

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user;
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() user: UserUpdateDTO,
  ): Promise<UserDTO> {
    return this.usersService.updateUser(parseInt(id), user);
  }
}
