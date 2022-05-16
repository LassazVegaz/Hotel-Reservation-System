import { UserRole } from "../enums/user-role.enum";

export type User = {
	id: number;
	name: string;
	email: string;
	number: string;
	roleId: UserRole;
};
