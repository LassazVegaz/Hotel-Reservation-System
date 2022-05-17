import { User } from "../types/user.type";
import { appAxios } from "./api.helpers";
import endpoints from "../api-endpoints.json";

const createUser = async (user: User) => {
	try {
		const res = await appAxios.post<User>(endpoints.users.common, user);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const apiHelpers = {
	createUser,
};
