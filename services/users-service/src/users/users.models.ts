import { User } from '@prisma/client';

export type UserCreateDTO = Omit<User, 'id'>;
