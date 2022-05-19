import { loaderActions } from "../redux/slices/loader.slice";
import { useNotifications } from "./notifications.hook";
import { useAppDispatch } from "./redux.hooks";

export type ApiHandlerOptions = {
	handleError?: boolean;
	showSuccessNotification?: boolean;
	showErrorNotification?: boolean;
};

export const useApi = () => {
	const dispatch = useAppDispatch();
	const { showSuccess, showError } = useNotifications();

	return async (
		cb: () => Promise<void>,
		options: ApiHandlerOptions = {
			handleError: true,
			showSuccessNotification: true,
			showErrorNotification: true,
		}
	) => {
		try {
			dispatch(loaderActions.startLoading());
			await cb();
			if (options.showSuccessNotification) showSuccess("Successfull");
		} catch (error) {
			if (options.showErrorNotification) showError("Failed");
			if (!options.handleError) throw error;
		} finally {
			dispatch(loaderActions.stopLoading());
		}
	};
};
