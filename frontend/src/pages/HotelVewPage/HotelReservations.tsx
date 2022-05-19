import { Add as AddIcon } from "@mui/icons-material";
import { Box, Fab, Typography } from "@mui/material";
import { useState } from "react";
import { AddEditReservationDialog } from "../../components/AddEditReservationDialog/AddEditReservationDialog";
import { UserRole } from "../../enums/user-role.enum";
import { useAppSelector } from "../../hooks/redux.hooks";
import { LoggedInAuth } from "../../redux/slices/auth.slice";
import { ReservationsList } from "./ReservationsList";

export const HotelReservations = () => {
	const authData = useAppSelector((s) => s.auth as LoggedInAuth);
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
					{authData.roleId === UserRole.HotelAdmin && (
						<Fab
							sx={{
								position: "absolute",
								right: 0,
							}}
							onClick={() => setOpenDialog(true)}
						>
							<AddIcon />
						</Fab>
					)}
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
