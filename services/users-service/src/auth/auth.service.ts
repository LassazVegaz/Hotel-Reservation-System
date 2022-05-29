import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/users/users.models';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDTO> {
    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      const match = await this.usersService.isPasswordCorrect(
        user.id,
        password,
      );
      if (match) {
        return user;
      }
    }
    return null;
  }

  login(user: UserDTO) {
    const payload = { sub: user.id, roleId: user.roleId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
