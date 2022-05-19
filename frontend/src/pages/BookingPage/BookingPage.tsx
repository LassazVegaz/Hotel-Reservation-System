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

			<HotelDetailsCard
				hotel={{
					name: "Hotel Name",
					address: "Hotel Address",
					hotelAdminId: 0,
					id: 0,
					location_lat: 0,
					location_lng: 0,
				}}
			/>

			<BookingForm />
		</Container>
	);
};
