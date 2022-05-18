import { AxiosError } from "axios";
import { appAxios } from "../helpers/api.helpers";
import { authHelper } from "../helpers/auth.helper";
import { usersApiHelpers } from "../helpers/users-api.helpers";
import { authActions } from "../redux/slices/auth.slice";
import { User } from "../types/user.type";
import { useApi } from "./api.hook";
import { useNotifications } from "./notifications.hook";
import { useAppDispatch } from "./redux.hooks";

export const useUsersApi = () => {
	const api = useApi();
	const { showError } = useNotifications();
	const dispatch = useAppDispatch();

	const refreshAuthtore = () => {
		const data = authHelper.getAuthData();
		if (data) {
			dispatch(
				authActions.setLoggedUser({
					id: data.id,
					roleId: data.roleId,
				})
			);
		} else {
			dispatch(authActions.setLoggedUser(false));
		}
	};

	const createUser = async (user: User): Promise<User | null> => {
		let newUser: User | null = null;

		await api(async () => {
			newUser = await usersApiHelpers.createUser(user);
		});

		return newUser;
	};

	const loginUser = async (
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			await api(async () => {
				const token = await usersApiHelpers.loginUser(email, password);
				const user = await usersApiHelpers.getLoggedInUser();
				authHelper.setAuthData({
					access_token: token,
					...user,
				});
				refreshAuthtore();
			}, true);

			return true;
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) {
					showError("Invalid credentials");
				}
			} else console.error(error);
		}

		return false;
	};

	const logoutUser = () => {
		authHelper.removeAuthData();
		refreshAuthtore();
		// remove header from axios
		appAxios.defaults.headers.common["Authorization"] = "";
	};

	const isEmailTaken = async (email: string): Promise<boolean | null> => {
		let taken: boolean | null = null;

		await api(async () => {
			taken = await usersApiHelpers.isEmailTaken(email);
		});

		return taken;
	};

	return { createUser, loginUser, refreshAuthtore, logoutUser, isEmailTaken };
};
