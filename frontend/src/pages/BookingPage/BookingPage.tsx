import { Container, Typography } from "@mui/material";
import { HotelDetailsCard } from "../../components/HotelDetailsCard/HotelDetailsCard";
import { BookingForm } from "./BookingForm";

export const BookingPage = () => {
	return (
		<Container
			maxWidth="lg"
			sx={{
				my: 10,
			}}
		>
			<Typography variant="h4" mb={8}>
				Select a date range for your Reservation
			</Typography>

			<HotelDetailsCard />

			<BookingForm />
		</Container>
	);
};
