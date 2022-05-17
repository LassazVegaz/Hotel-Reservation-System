import { AxiosError } from "axios";
import { authHelper } from "../helpers/auth.helper";
import { apiHelpers } from "../helpers/users-api.helpers";
import { User } from "../types/user.type";
import { useApi } from "./api-calls.hook";
import { useNotifications } from "./notifications.hook";

export const useUsersApi = () => {
	const api = useApi();
	const { showError } = useNotifications();

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
			}, true);
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) {
					showError("Invalid credentials");
				}
			}
			console.error(error);
		}
	};

	return { createUser, loginUser };
};
