import styled from "@emotion/styled";
import {
	TextField,
	Box,
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
} from "@mui/material";
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
				<CardContent>
					<Box
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

					<Box mt={5} display="flex">
						<Typography>Price:</Typography>
						<Typography ml={3} fontWeight="bold">
							500.00
						</Typography>
					</Box>
				</CardContent>

				<CardActions
					sx={{
						justifyContent: "flex-end",
					}}
				>
					<Button
						variant="outlined"
						color="secondary"
						sx={{
							mr: 2,
						}}
					>
						Cancel
					</Button>
					<Button variant="contained" color="primary">
						Book
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};
