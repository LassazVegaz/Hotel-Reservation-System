import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import moment from "moment";
import { AdvancedBookingData } from "../../types/advanced-booking-data.type";
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

export const BookingListItem = ({
	booking,
	onCancel,
}: {
	booking: AdvancedBookingData;
	onCancel: (id: number) => void;
}) => {
	const { booking: _booking, reservation, hotel } = booking;
	const fromDate = moment(_booking.fromDate);
	const toDate = moment(_booking.toDate);
	const days = toDate.diff(fromDate, "days") + 1;
	let price = reservation.price * days;

	if (_booking.taxiSerivceSelected) price += 400;

	return (
		<Card>
			<CardContent>
				<DetailsRow label="Hotel name" value={hotel.name} />
				<DetailsRow label="Hotel address" value={hotel.address} />
				<DetailsRow
					label="Package description"
					value={reservation.description}
				/>
				<DetailsRow
					label="From"
					value={fromDate.format("DD/MM/YYYY")}
				/>
				<DetailsRow label="To" value={toDate.format("DD/MM/YYYY")} />
				<DetailsRow
					label="Taxi service"
					value={_booking.taxiSerivceSelected ? "Yes" : "No"}
				/>
				<DetailsRow
					label="Post-payemment"
					value={_booking.postPaidSelected ? "Yes" : "No"}
				/>
				<DetailsRow label="Price" value={price.toFixed(2)} />
			</CardContent>

			<CardActions
				sx={{
					justifyContent: "flex-end",
				}}
			>
				<Button
					variant="outlined"
					color="secondary"
					onClick={() => onCancel(_booking.id)}
				>
					Cancel
				</Button>
			</CardActions>
		</Card>
	);
};
