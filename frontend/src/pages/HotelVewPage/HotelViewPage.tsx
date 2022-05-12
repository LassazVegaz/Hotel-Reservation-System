import { Container } from "@mui/material";
import { HotelView } from "./HotelView";

export const HotelViewPage = () => {
	return (
		<Container
			sx={{
				my: 10,
			}}
		>
			<HotelView />
		</Container>
	);
};
