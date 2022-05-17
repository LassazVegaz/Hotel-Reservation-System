import { authHelper } from "../helpers/auth.helper";
import { apiHelpers } from "../helpers/users-api.helpers";
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
	): Promise<void> => {
		try {
			await api(async () => {
				const token = await apiHelpers.loginUser(email, password);
				const user = await apiHelpers.getLoggedInUser();
				authHelper.setAuthData({
					access_token: token,
					...user,
				});
			});
		} catch (error) {
			console.error(error);
			debugger;
		}
	};

	return { createUser, loginUser };
};
