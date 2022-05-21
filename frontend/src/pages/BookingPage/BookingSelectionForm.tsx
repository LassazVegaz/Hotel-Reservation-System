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
import { FormikProps } from "formik";
import moment from "moment";
import { Booking } from "../../types/booking.type";
import { Reservation } from "../../types/hotel-reservation.type";
import { ValueLabelPair } from "../../types/value-label-pair.type";
import { BookingFormCalculations } from "./BookingFormCalculations";

type BookingFormType = FormikProps<
	Omit<Booking, "id" | "reservationId" | "customerId">
>;

export type BookingFormProps = {
	form: BookingFormType;
	reservation: Reservation;
};

const DateControl = styled(TextField)({
	width: "100%",
});

const CheckboxRow = ({
	label,
	value,
	name,
	onChange,
}: ValueLabelPair<boolean> & {
	name: string;
	onChange: (e: React.ChangeEvent<any>) => void;
}) => {
	return (
		<Box display="flex" alignItems="center">
			<Typography width={300}>{label}</Typography>
			<Checkbox checked={value} name={name} onChange={onChange} />
		</Box>
	);
};

const BookingDatePicker = ({
	form,
	name,
	label,
}: {
	form: FormikProps<any>;
	name: string;
	label: string;
}) => {
	return (
		<DatePicker
			inputFormat="DD/MM/YYYY"
			label={label}
			minDate={moment()}
			value={moment(form.values[name], "DD/MM/YYYY")}
			onChange={(date) =>
				form.setFieldValue(name, date?.format("DD/MM/YYYY"))
			}
			renderInput={(props) => (
				<DateControl
					name={name}
					{...props}
					error={
						Boolean(form.errors[name]) &&
						Boolean(form.touched[name])
					}
					helperText={
						Boolean(form.touched[name])
							? (form.errors[name] as string)
							: null
					}
				/>
			)}
		/>
	);
};

export const BookingSlectionForm = ({
	form,
	reservation,
}: BookingFormProps) => {
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
						<BookingDatePicker
							form={form}
							name="fromDate"
							label="From"
						/>
						<BookingDatePicker
							form={form}
							name="toDate"
							label="To"
						/>
					</Box>

					{(reservation.allowPostPaid ||
						reservation.taxiServiceAvailable) && (
						<Box mb={5} display="flex" flexDirection="column">
							{reservation.taxiServiceAvailable && (
								<CheckboxRow
									label="Taxi service"
									value={form.values.taxiSerivceSelected}
									name="taxiSerivceSelected"
									onChange={form.handleChange}
								/>
							)}
							{reservation.allowPostPaid && (
								<CheckboxRow
									label="Post paid"
									value={form.values.postPaidSelected}
									name="postPaidSelected"
									onChange={form.handleChange}
								/>
							)}
						</Box>
					)}

					<BookingFormCalculations />
				</CardContent>
			</Card>
		</Box>
	);
};
