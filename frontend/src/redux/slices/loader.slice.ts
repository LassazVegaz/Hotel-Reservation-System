import { createSlice } from "@reduxjs/toolkit";

type LoaderState = {
	isLoading: boolean;
};

const initialState: LoaderState = {
	isLoading: false,
};

export const loaderSlice = createSlice({
	name: "loader",
	initialState,
	reducers: {
		startLoading: (state: LoaderState) => {
			state.isLoading = true;
		},
		stopLoading: (state: LoaderState) => {
			state.isLoading = false;
		},
	},
});

export const loaderActions = loaderSlice.actions;
