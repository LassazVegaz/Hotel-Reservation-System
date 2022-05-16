import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import { ValueLabelPair } from "../../types/value-label-pair.type";

const DetailsRow = ({ label, value }: ValueLabelPair<string>) => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Typography>{label}</Typography>
			<Typography>{value}</Typography>
		</Box>
	);
};

export const BookingListItem = () => {
	return (
		<Card>
			<CardContent>
				<DetailsRow label="Hotel name" value="Nilaweli Hotel" />
				<DetailsRow
					label="Hotel address"
					value="10/6, Kings Road, James"
				/>
				<DetailsRow
					label="Package description"
					value="My sweet package"
				/>
				<DetailsRow label="From" value="10/10/2020" />
				<DetailsRow label="To" value="12/10/2020" />
				<DetailsRow label="Taxi service" value="Yes" />
				<DetailsRow label="Pre-payemment" value="Yes" />
				<DetailsRow label="Price" value="1500.00" />
			</CardContent>

			<CardActions
				sx={{
					justifyContent: "flex-end",
				}}
			>
				<Button variant="outlined" color="secondary">
					Cancel
				</Button>
			</CardActions>
		</Card>
	);
};
