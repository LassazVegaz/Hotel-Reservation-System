import { loaderActions } from "../redux/slices/loader.slice";
import { useNotifications } from "./notifications.hook";
import { useAppDispatch } from "./redux.hooks";

export const useApi = () => {
	const dispatch = useAppDispatch();
	const { showSuccess, showError } = useNotifications();

	return async (cb: () => Promise<void>, throwEx = false) => {
		try {
			dispatch(loaderActions.startLoading());
			await cb();
			showSuccess("Successfull");
		} catch (error) {
			if (throwEx) throw error;
			else showError("Failed");
		} finally {
			dispatch(loaderActions.stopLoading());
		}
	};
};
