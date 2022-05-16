import { BedroomChild as BedroomChildIcon } from "@mui/icons-material";
import {
	ListItemButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	Button,
	List,
} from "@mui/material";

const ReservationItem = () => {
	return (
		<ListItemButton>
			<ListItemAvatar>
				<Avatar>
					<BedroomChildIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary="Reservation 1" secondary="500.00" />
			<ListItemSecondaryAction>
				<Button variant="outlined">BOOK</Button>
			</ListItemSecondaryAction>
		</ListItemButton>
	);
};

export const ReservationsList = () => {
	return (
		<List>
			<ReservationItem />
			<ReservationItem />
			<ReservationItem />
		</List>
	);
};
