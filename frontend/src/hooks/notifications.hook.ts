import { notificationActions } from "../redux/slices/notification.slice";
import { useAppDispatch } from "./redux.hooks";

export const useNotifications = () => {
	const dispatch = useAppDispatch();

	const showNotification = (message: string, type: "success" | "error") => {
		dispatch(
			notificationActions.showNotification({
				message,
				type,
			})
		);
	};

	const hideNotification = () => {
		dispatch(notificationActions.hideNotification());
	};

	const showError = (msg: string) => showNotification(msg, "error");
	const showSuccess = (msg: string) => showNotification(msg, "success");

	return {
		showNotification,
		hideNotification,
		showError,
		showSuccess,
	};
};
