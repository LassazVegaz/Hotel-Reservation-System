import { Box, Card, CardContent, Typography } from "@mui/material";

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

export const HotelDetailsCard = () => {
	return (
		<Card>
			<CardContent>
				<HotelViewRow label="Name" value="Mount Lavenia" />
				<HotelViewRow label="Address" value="Kins Road, Lake Place" />
			</CardContent>
		</Card>
	);
};
