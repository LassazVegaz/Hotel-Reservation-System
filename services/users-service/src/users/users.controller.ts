import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserCreateDTO, UserDTO, UserUpdateDTO } from './users.models';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: UserCreateDTO): Promise<UserDTO> {
    // remapping is needed
    const createDto: UserCreateDTO = {
      email: user.email,
      password: user.password,
      roleId: user.roleId,
      name: user.name,
      number: user.number,
    };
    return this.usersService.createUser(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(): Promise<UserDTO[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDTO> {
    return this.usersService.getUser(parseInt(id));
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() user: UserUpdateDTO,
  ): Promise<UserDTO> {
    const updateDto: UserUpdateDTO = {
      name: user.name,
      number: user.number,
      email: user.email,
    };
    return this.usersService.updateUser(parseInt(id), updateDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(parseInt(id));
  }
}
