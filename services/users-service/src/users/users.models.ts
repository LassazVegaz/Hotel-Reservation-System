import { User } from '@prisma/client';

export type UserCreateDTO = Omit<User, 'id'>;

export type UserDTO = Omit<User, 'password'>;

export type UserUpdateDTO = Omit<User, 'id' | 'password' | 'roleId'>;
