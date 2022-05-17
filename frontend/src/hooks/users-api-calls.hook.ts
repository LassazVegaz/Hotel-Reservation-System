import { apiHelpers } from "../helpers/users-api.helpers";
import { LoginResult } from "../types/login-results.type";
import { User } from "../types/user.type";
import { useApi } from "./api-calls.hook";

export const useUsersApi = () => {
	const api = useApi();

	const createUser = async (user: User): Promise<User | null> => {
		let newUser: User | null = null;

		await api(async () => {
			newUser = await apiHelpers.createUser(user);
		});

		return newUser;
	};

	const loginUser = async (
		email: string,
		password: string
	): Promise<LoginResult | null> => {
		let loginResults: LoginResult | null = null;

		try {
			await api(async () => {
				loginResults = await apiHelpers.loginUser(email, password);
			});
		} catch (error) {
			console.error(error);
			debugger;
		}

		return loginResults;
	};

	return { createUser, loginUser };
};
