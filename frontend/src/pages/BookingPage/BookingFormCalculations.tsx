import { Box, Typography } from "@mui/material";

type DetailRowProps = {
	label: string;
	value: string;
};

const DetailRow = ({ label, value }: DetailRowProps) => {
	return (
		<Box display="flex">
			<Typography width={200}>{label}:</Typography>
			<Typography width={100} textAlign="right" fontWeight="bold">
				{value}
			</Typography>
		</Box>
	);
};

export const BookingFormCalculations = () => {
	return (
		<Box display="flex" flexDirection="column" rowGap={2}>
			<DetailRow label="Price per day" value="500.00" />
			<DetailRow label="Total days" value="3" />
			<DetailRow label="Taxi service" value="400.00" />
			<DetailRow label="Total price" value="1900.00" />
		</Box>
	);
};
