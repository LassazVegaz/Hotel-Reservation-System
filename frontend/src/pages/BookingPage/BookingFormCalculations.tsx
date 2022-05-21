import { Box, Typography } from "@mui/material";
import moment from "moment";
import { getBookedDays } from "../../helpers/date.helpers";
import { Reservation } from "../../types/hotel-reservation.type";
import { ValueLabelPair } from "../../types/value-label-pair.type";

type BookingFormCalculationsProps = {
	fromDate: string;
	toDate: string;
	reservation: Reservation;
	isTaxiSelected: boolean;
};

const DetailRow = ({ label, value }: ValueLabelPair<string | number>) => {
	return (
		<Box display="flex">
			<Typography width={200}>{label}:</Typography>
			<Typography width={100} textAlign="right" fontWeight="bold">
				{value}
			</Typography>
		</Box>
	);
};

export const BookingFormCalculations = ({
	fromDate,
	toDate,
	reservation,
	isTaxiSelected,
}: BookingFormCalculationsProps) => {
	const pricePerday = Number(reservation.price);
	const taxiPrice = isTaxiSelected ? 400 : 0;
	const _fromDate = moment(fromDate, "DD/MM/YYYY");
	const _toDate = moment(toDate, "DD/MM/YYYY");
	const days = getBookedDays(_fromDate, _toDate);
	let totalPrice = 0;

	if (reservation.taxiServiceAvailable) totalPrice += taxiPrice;
	totalPrice += days * pricePerday;

	return (
		<Box display="flex" flexDirection="column" rowGap={2}>
			<DetailRow label="Price per day" value={pricePerday.toFixed(2)} />
			<DetailRow label="Total days" value={days} />
			<DetailRow label="Taxi service" value={taxiPrice.toFixed(2)} />
			<DetailRow label="Total price" value={totalPrice.toFixed(2)} />
		</Box>
	);
};
