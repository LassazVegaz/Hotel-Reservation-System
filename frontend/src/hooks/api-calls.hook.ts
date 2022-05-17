import { loaderActions } from "../redux/slices/loader.slice";
import { notificationActions } from "../redux/slices/notification.slice";
import { useAppDispatch } from "./redux.hooks";

export const useApi = () => {
	const dispatch = useAppDispatch();

	return async (cb: () => Promise<void>, throwEx = false) => {
		try {
			dispatch(loaderActions.startLoading());
			await cb();
			dispatch(
				notificationActions.showNotification({
					message: "Success",
					type: "success",
				})
			);
		} catch (error) {
			if (throwEx) throw error;
			else
				dispatch(
					notificationActions.showNotification({
						message: "Failed",
						type: "error",
					})
				);
		} finally {
			dispatch(loaderActions.stopLoading());
		}
	};
};
