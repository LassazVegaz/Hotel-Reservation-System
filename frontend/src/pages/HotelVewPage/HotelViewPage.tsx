import { Container } from "@mui/material";
import { HotelReservations } from "./HotelReservations";
import { HotelView } from "./HotelView";

export const HotelViewPage = () => {
	return (
		<Container
			sx={{
				my: 10,
			}}
		>
			<HotelView />

			<HotelReservations />
		</Container>
	);
};
