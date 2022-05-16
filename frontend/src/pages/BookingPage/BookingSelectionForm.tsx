import {
	Card,
	CardContent,
	Box,
	Checkbox,
	styled,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useState } from "react";
import { ValueLabelPair } from "../../types/value-label-pair.type";
import { BookingFormCalculations } from "./BookingFormCalculations";

type BookingFormState = {
	fromDate: moment.Moment | null;
	toDate: moment.Moment | null;
};

const DateControl = styled(TextField)({
	width: "100%",
});

const CheckboxRow = ({ label, value }: ValueLabelPair<boolean>) => {
	return (
		<Box display="flex" alignItems="center">
			<Typography width={300}>{label}</Typography>
			<Checkbox checked={value} />
		</Box>
	);
};

export const BookingSlectionForm = () => {
	const [from, setFrom] = useState<BookingFormState>({
		fromDate: moment(),
		toDate: moment(),
	});

	return (
		<Box component="form">
			<Card>
				<CardContent>
					<Box
						mb={5}
						display="flex"
						justifyContent="space-evenly"
						columnGap={5}
					>
						<DatePicker
							inputFormat="DD/MM/YYYY"
							label="From"
							minDate={moment()}
							value={from.fromDate}
							onChange={(date) =>
								setFrom({ ...from, fromDate: date })
							}
							renderInput={(props) => <DateControl {...props} />}
						/>
						<DatePicker
							inputFormat="DD/MM/YYYY"
							label="To"
							minDate={moment()}
							value={from.toDate}
							onChange={(date) =>
								setFrom({ ...from, toDate: date })
							}
							renderInput={(props) => <DateControl {...props} />}
						/>
					</Box>

					<Box mb={5} display="flex" flexDirection="column">
						<CheckboxRow label="Taxi service" value={true} />
						<CheckboxRow label="Cash on delivery" value={true} />
					</Box>

					<BookingFormCalculations />
				</CardContent>
			</Card>
		</Box>
	);
};
