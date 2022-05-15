import { Add as AddIcon } from "@mui/icons-material";
import { Box, Fab, Typography } from "@mui/material";
import { useState } from "react";
import { AddEditReservationDialog } from "../../components/AddEditReservationDialog/AddEditReservationDialog";
import { ReservationsList } from "./ReservationsList";

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
