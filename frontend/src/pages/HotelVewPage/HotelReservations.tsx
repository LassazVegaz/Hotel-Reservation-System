import { Add as AddIcon } from "@mui/icons-material";
import { Box, Fab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AddEditReservationDialog } from "../../components/AddEditReservationDialog/AddEditReservationDialog";
import { UserRole } from "../../enums/user-role.enum";
import { useReservationsApi } from "../../hooks/hotel-reservations.hook";
import { useAppSelector } from "../../hooks/redux.hooks";
import { LoggedInAuth } from "../../redux/slices/auth.slice";
import { Reservation } from "../../types/hotel-reservation.type";
import { ReservationsList } from "./ReservationsList";

export const HotelReservations = ({ hotelId }: { hotelId: number }) => {
	const authData = useAppSelector((s) => s.auth as LoggedInAuth);
	const { getReservations } = useReservationsApi();
	const [openDialog, setOpenDialog] = useState(false);
	const [reservations, setReservations] = useState([] as Reservation[]);

	const loadReservations = async () => {
		const res = await getReservations(hotelId);
		if (res) setReservations(res);
	};

	useEffect(() => {
		loadReservations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hotelId]);

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

				<ReservationsList reservations={reservations} />
			</Box>

			<AddEditReservationDialog
				open={openDialog}
				hotelId={hotelId}
				onClose={(created) => {
					setOpenDialog(false);
					if (created) loadReservations();
				}}
			/>
		</>
	);
};
