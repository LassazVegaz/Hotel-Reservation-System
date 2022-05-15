import { Container } from "@mui/material";
import { HotelDetailsCard } from "../../components/HotelDetailsCard/HotelDetailsCard";
import { HotelReservations } from "./HotelReservations";

export const HotelViewPage = () => {
	return (
		<Container
			sx={{
				my: 10,
			}}
		>
			<HotelDetailsCard />

			<HotelReservations />
		</Container>
	);
};
