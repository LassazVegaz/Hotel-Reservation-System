import axios from "axios";
import { User } from "../types/user.type";
import config from "../config.json";

const _axios = axios.create({
	baseURL: config.baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

const createUser = async (user: User) => {
	try {
		const res = await _axios.post<User>("/users", user);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const apiHelpers = {
	createUser,
};
