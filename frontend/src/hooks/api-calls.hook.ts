import { loaderActions } from "../redux/slices/loader.slice";
import { useAppDispatch } from "./redux.hooks";

export const useApi = () => {
	const dispatch = useAppDispatch();

	return async (cb: () => Promise<void>) => {
		try {
			dispatch(loaderActions.startLoading());
			await cb();
		} catch (error) {
		} finally {
			dispatch(loaderActions.stopLoading());
		}
	};
};
