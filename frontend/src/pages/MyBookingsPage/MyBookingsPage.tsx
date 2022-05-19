import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useBookingsApi } from "../../hooks/bookings-api.hook";
import { useAppSelector } from "../../hooks/redux.hooks";
import { AdvancedBookingData } from "../../types/advanced-booking-data.type";
import { BookingListItem } from "./BookingListItem";

export const MyBookingsPage = () => {
	const [bookings, setBookings] = useState([] as AdvancedBookingData[]);
	const customerId = useAppSelector((s) => (s.auth ? s.auth.id : 0));
	const { getBookings, cancelBooking } = useBookingsApi();

	const loadBookings = async () => {
		const bookings = await getBookings(customerId);
		setBookings(bookings);
	};

	useEffect(() => {
		loadBookings();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [customerId]);

	return (
		<Container maxWidth="lg" sx={{ my: 5 }}>
			<Typography variant="h4">Your Bookings</Typography>

			<Box my={5} display="flex" flexDirection="column" rowGap={5}>
				{bookings.map((booking) => (
					<BookingListItem
						key={booking.booking.id}
						booking={booking}
						onCancel={(id) => {
							cancelBooking(id).then(loadBookings);
						}}
					/>
				))}
			</Box>
		</Container>
	);
};
