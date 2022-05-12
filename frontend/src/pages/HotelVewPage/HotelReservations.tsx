import { Add as AddIcon } from "@mui/icons-material";
import {
	Box,
	Fab,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";

const ReservationsList = () => {
	return (
		<List>
			<ListItemButton>
				<ListItemText primary="Reservation 1" secondary="500.00" />
			</ListItemButton>
			<ListItemButton>
				<ListItemText primary="Reservation 1" secondary="500.00" />
			</ListItemButton>
			<ListItemButton>
				<ListItemText primary="Reservation 1" secondary="500.00" />
			</ListItemButton>
		</List>
	);
};

export const HotelReservations = () => {
	return (
		<Box mt={10} position="relative">
			<Typography variant="h4">Reservations of this Hotel</Typography>

			<ReservationsList />

			<Fab
				sx={{
					position: "absolute",
					right: 0,
					bottom: 0,
				}}
			>
				<AddIcon />
			</Fab>
		</Box>
	);
};
