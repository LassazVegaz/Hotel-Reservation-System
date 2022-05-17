import { UserRole } from "../enums/user-role.enum";

export type LoginResult = {
	access_token: string;
	id: number;
	roleId: UserRole;
};
