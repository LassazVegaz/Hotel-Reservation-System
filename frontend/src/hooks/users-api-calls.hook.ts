import { apiHelpers } from "../helpers/api.helpers";
import { User } from "../types/user.type";
import { useApi } from "./api-calls.hook";

export const useUsersApi = () => {
	const api = useApi();

	const createUser = async (user: User): Promise<User | null> => {
		let newUser: User | null = null;

		try {
			await api(async () => {
				newUser = await apiHelpers.createUser(user);
			});
		} catch (error) {
			console.error(error);
		}

		return newUser;
	};

	return { createUser };
};
