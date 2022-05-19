import { UserRole } from "../enums/user-role.enum";

const AUTH_KEY = "_";

export type AuthData = {
	access_token: string;
	id: number;
	roleId: UserRole;
};

export const authHelper = {
	setAuthData: (data: AuthData) => {
		localStorage.setItem(AUTH_KEY, JSON.stringify(data));
	},
	getAuthData: (): AuthData | null => {
		const data = localStorage.getItem(AUTH_KEY);
		return data ? JSON.parse(data) : null;
	},
	removeAuthData: () => {
		localStorage.removeItem(AUTH_KEY);
	},
};
