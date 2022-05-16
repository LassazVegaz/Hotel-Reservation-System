import { loaderActions } from "../redux/slices/loader.slice";
import { notificationActions } from "../redux/slices/notification.slice";
import { useAppDispatch } from "./redux.hooks";

export const useApi = () => {
	const dispatch = useAppDispatch();

	return async (cb: () => Promise<void>) => {
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
