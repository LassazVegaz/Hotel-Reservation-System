import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HotelDetailsCard } from "../../components/HotelDetailsCard/HotelDetailsCard";
import { useReservationsApi } from "../../hooks/hotel-reservations.hook";
import { Reservation } from "../../types/hotel-reservation.type";
import { Hotel } from "../../types/hotel.type";
import { BookingForm } from "./BookingForm";

export const BookingPage = () => {
	const reservationId = useParams<{ id: string }>().id;
	const [hotel, setHotel] = useState<Hotel | null>(null);
	const [reservation, setReservation] = useState<Reservation | null>(null);
	const { getReservationAndHotel } = useReservationsApi();

	useEffect(() => {
		if (reservationId) {
			getReservationAndHotel(parseInt(reservationId)).then((data) => {
				if (data) {
					setHotel(data.hotel);
					setReservation(data.reservation);
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reservationId]);

	return reservationId && hotel && reservation ? (
		<Container
			maxWidth="lg"
			sx={{
				my: 10,
			}}
		>
			<Typography variant="h4" mb={8}>
				Select a date range for your Reservation
			</Typography>

			<HotelDetailsCard hotel={hotel} />

			<BookingForm reservation={reservation} />
		</Container>
	) : null;
};
