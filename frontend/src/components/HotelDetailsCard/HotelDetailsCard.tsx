import { Box, Card, CardContent, Typography } from "@mui/material";
import { Hotel } from "../../types/hotel.type";

const HotelViewRow = ({ label, value }: { label: string; value: string }) => {
	return (
		<Box display="flex" justifyContent="space-between" width={500}>
			<Typography fontWeight="600" variant="h5">
				{label}
			</Typography>
			<Typography variant="h5">{value}</Typography>
		</Box>
	);
};

export const HotelDetailsCard = ({ hotel }: { hotel: Hotel }) => {
	return (
		<Card>
			<CardContent>
				<HotelViewRow label="Name" value={hotel.name} />
				<HotelViewRow label="Address" value={hotel.address} />
			</CardContent>
		</Card>
	);
};
