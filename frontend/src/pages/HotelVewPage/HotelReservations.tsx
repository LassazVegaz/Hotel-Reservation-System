import { Add as AddIcon } from "@mui/icons-material";
import { Box, Fab, Typography } from "@mui/material";
import { useState } from "react";
import { AddEditReservationDialog } from "../../components/AddEditReservationDialog/AddEditReservationDialog";
import { ReservationsList } from "./ReservationsList";

export const HotelReservations = () => {
	const [openDialog, setOpenDialog] = useState(false);

	return (
		<>
			<Box mt={10}>
				<Typography
					variant="h4"
					position="relative"
					display="flex"
					alignItems="center"
				>
					Reservations of this Hotel
					<Fab
						sx={{
							position: "absolute",
							right: 0,
						}}
						onClick={() => setOpenDialog(true)}
					>
						<AddIcon />
					</Fab>
				</Typography>

				<ReservationsList />
			</Box>

			<AddEditReservationDialog
				open={openDialog}
				onClose={() => setOpenDialog(false)}
			/>
		</>
	);
};
