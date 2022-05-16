import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./slices/loader.slice";

export const store = configureStore({
	reducer: {
		loader: loaderSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
