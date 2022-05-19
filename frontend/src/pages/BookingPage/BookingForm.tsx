import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { BookingSlectionForm } from "./BookingSelectionForm";
import { CreditCardForm } from "./CreditCardForm";
import { Booking } from "../../types/booking.type";
import * as Yup from "yup";
import moment from "moment";

const transformDate = (_value: any, original: moment.MomentInput) =>
	moment(original, "DD/MM/YYYY").toDate();

const bookingFormValidations = Yup.object({
	fromDate: Yup.date()
		.transform(transformDate)
		.required("Required")
		.typeError("Invalid date"),
	toDate: Yup.date()
		.transform(transformDate)
		.required("Required")
		.typeError("Invalid date")
		.min(Yup.ref("fromDate"), "End date should be after start date"),
});

const bookingFormInitialValues: Omit<
	Booking,
	"id" | "reservationId" | "customerId"
> = {
	fromDate: moment().format("DD/MM/YYYY"),
	toDate: moment().format("DD/MM/YYYY"),
	postPaidSelected: false,
	taxiSerivceSelected: false,
};

export const BookingForm = () => {
	const bookingForm = useFormik({
		initialValues: bookingFormInitialValues,
		validationSchema: bookingFormValidations,
		onSubmit: (values) => {},
	});

	return (
		<Box mt={5}>
			<BookingSlectionForm form={bookingForm} />

			{!bookingForm.values.postPaidSelected && (
				<Box my={5}>
					<CreditCardForm />
				</Box>
			)}

			<Box mt={5} display="flex" justifyContent="flex-end">
				<Button
					variant="outlined"
					color="secondary"
					sx={{
						mr: 2,
					}}
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={bookingForm.submitForm}
				>
					Book
				</Button>
			</Box>
		</Box>
	);
};
