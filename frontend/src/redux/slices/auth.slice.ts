import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "../../helpers/auth.helper";

type AuthSliceState = Omit<AuthData, "access_token"> | null;

const initialState: AuthSliceState = null;

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoggedUser: (
			state: AuthSliceState,
			action: PayloadAction<Omit<AuthData, "access_token">>
		) => {
			state = action.payload;
		},
	},
});

export const authActions = authSlice.actions;
