import styled from "@emotion/styled";
import { TextField, Box, Card, CardContent } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { useState } from "react";

type BookingFormState = {
	fromDate: moment.Moment | null;
	toDate: moment.Moment | null;
};

const DateControl = styled(TextField)({
	width: "100%",
});

export const BookingForm = () => {
	const [from, setFrom] = useState<BookingFormState>({
		fromDate: moment(),
		toDate: moment(),
	});

	return (
		<Box component="form" mt={5}>
			<Card>
				<CardContent
					sx={{
						display: "flex",
						justifyContent: "space-evenly",
						columnGap: 5,
					}}
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
						onChange={(date) => setFrom({ ...from, toDate: date })}
						renderInput={(props) => <DateControl {...props} />}
					/>
				</CardContent>
			</Card>
		</Box>
	);
};
