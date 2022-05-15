import {
	Add as AddIcon,
	BedroomChild as BedroomChildIcon,
} from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Fab,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemSecondaryAction,
	ListItemText,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { AddEditReservationDialog } from "../../components/AddEditReservationDialog/AddEditReservationDialog";

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

const ReservationsList = () => {
	return (
		<List>
			<ReservationItem />
			<ReservationItem />
			<ReservationItem />
		</List>
	);
};

export const HotelReservations = () => {
	const [openDialog, setOpenDialog] = useState(false);

	return (
		<>
			<Box mt={10} position="relative">
				<Typography variant="h4">Reservations of this Hotel</Typography>

				<ReservationsList />

				<Fab
					sx={{
						position: "absolute",
						right: 0,
						bottom: 0,
					}}
					onClick={() => setOpenDialog(true)}
				>
					<AddIcon />
				</Fab>
			</Box>

			<AddEditReservationDialog
				open={openDialog}
				onClose={() => setOpenDialog(false)}
			/>
		</>
	);
};
