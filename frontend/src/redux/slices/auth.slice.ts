import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "../../helpers/auth.helper";

type AuthSliceState = Omit<AuthData, "access_token"> | false;

let initialState: AuthSliceState = false;

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState as AuthSliceState,
	reducers: {
		setLoggedUser: (
			state: AuthSliceState,
			action: PayloadAction<AuthSliceState>
		) => {
			return action.payload;
		},
	},
});

export const authActions = authSlice.actions;
