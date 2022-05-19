import { AxiosError } from "axios";
import { UserRole } from "../enums/user-role.enum";
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
			await api(
				async () => {
					const token = await usersApiHelpers.loginUser(
						email,
						password
					);
					authHelper.setAuthData({
						access_token: token,
						id: 0,
						roleId: UserRole.Customer,
					});
					const user = await usersApiHelpers.getLoggedInUser();
					authHelper.setAuthData({
						access_token: token,
						...user,
					});
					refreshAuthtore();
				},
				{
					handleError: false,
				}
			);

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
	};

	const isEmailTaken = async (email: string): Promise<boolean | null> => {
		let taken: boolean | null = null;

		await api(async () => {
			taken = await usersApiHelpers.isEmailTaken(email);
		});

		return taken;
	};

	const getUser = async (id: number): Promise<User | null> => {
		let user: User | null = null;

		await api(async () => {
			user = await usersApiHelpers.getUser(id);
		});

		return user;
	};

	return {
		createUser,
		loginUser,
		refreshAuthtore,
		logoutUser,
		isEmailTaken,
		getUser,
	};
};
