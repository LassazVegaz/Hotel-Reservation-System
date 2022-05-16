import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotificationState = {
	message: string | null;
	type: "success" | "error";
};

type ShowNotificationAction = {
	message: string;
	type: "success" | "error";
};

const initialState: NotificationState = {
	message: null,
	type: "success",
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		showNotification: (
			state: NotificationState,
			action: PayloadAction<ShowNotificationAction>
		) => {
			state.message = action.payload.message;
			state.type = action.payload.type;
		},
		hideNotification: (state: NotificationState) => {
			state.message = null;
		},
	},
});

export const notificationActions = notificationSlice.actions;
