import { User } from "../types/user.type";
import { appAxios } from "./api.helpers";

const createUser = async (user: User) => {
	try {
		const res = await appAxios.post<User>("/users", user);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const apiHelpers = {
	createUser,
};
