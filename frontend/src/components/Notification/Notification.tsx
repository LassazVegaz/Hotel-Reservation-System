import { Close as CloseIcon } from "@mui/icons-material";
import { Alert, IconButton } from "@mui/material";
import { useNotifications } from "../../hooks/notifications.hook";
import { useAppSelector } from "../../hooks/redux.hooks";

export const Notification = () => {
	const { message, type } = useAppSelector((s) => s.notification);
	const { hideNotification } = useNotifications();

	return message ? (
		<Alert
			variant="filled"
			severity={type}
			sx={{
				position: "fixed",
				right: 0,
				top: 0,
				zIndex: 1500,
				width: 300,
			}}
			action={
				<IconButton
					aria-label="close"
					color="inherit"
					size="small"
					onClick={() => hideNotification()}
				>
					<CloseIcon fontSize="inherit" />
				</IconButton>
			}
		>
			{message}
		</Alert>
	) : null;
};
