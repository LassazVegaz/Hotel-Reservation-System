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

const isEmailTaken = async (email: string) => {
	try {
		const res = await appAxios.get<boolean>(
			`${endpoints.users.isEmailTaken}/${email}`
		);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getUser = async (id: number) => {
	try {
		const res = await appAxios.get<User>(`${endpoints.users.common}/${id}`);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const updateUser = async (id: number, user: User) => {
	try {
		const res = await appAxios.patch<User>(
			`${endpoints.users.common}/${id}`,
			user
		);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const usersApiHelpers = {
	createUser,
	loginUser,
	getLoggedInUser,
	isEmailTaken,
	getUser,
	updateUser,
};
