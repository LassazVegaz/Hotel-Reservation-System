import { Box, Container, Typography } from "@mui/material";
import { BookingListItem } from "./BookingListItem";

export const MyBookingsPage = () => {
	return (
		<Container maxWidth="lg" sx={{ my: 5 }}>
			<Typography variant="h4">Your Bookings</Typography>

			<Box my={5}>
				<BookingListItem />
			</Box>
		</Container>
	);
};
