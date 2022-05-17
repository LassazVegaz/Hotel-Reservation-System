import { User } from "../types/user.type";
import { appAxios } from "./api.helpers";
import endpoints from "../api-endpoints.json";
import { UserRole } from "../enums/user-role.enum";

const createUser = async (user: User) => {
	try {
		const res = await appAxios.post<User>(endpoints.users.common, user);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const loginUser = async (email: string, password: string) => {
	try {
		const res = await appAxios.post<string>(endpoints.users.login, {
			email,
			password,
		});

		// add bearer token to axios headers
		appAxios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${res.data}`;

		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getLoggedInUser = async () => {
	try {
		const res = await appAxios.post<{
			id: number;
			roleId: UserRole;
		}>(endpoints.users.getLoggedUser);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const apiHelpers = {
	createUser,
	loginUser,
	getLoggedInUser,
};
