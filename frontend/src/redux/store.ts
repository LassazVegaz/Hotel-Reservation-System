import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice";
import { loaderSlice } from "./slices/loader.slice";
import { notificationSlice } from "./slices/notification.slice";

export const store = configureStore({
	reducer: {
		loader: loaderSlice.reducer,
		notification: notificationSlice.reducer,
		auth: authSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
