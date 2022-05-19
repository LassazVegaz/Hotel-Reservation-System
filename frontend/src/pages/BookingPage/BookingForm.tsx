import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { BookingSlectionForm } from "./BookingSelectionForm";
import { CreditCardForm } from "./CreditCardForm";
import { Booking } from "../../types/booking.type";
import * as Yup from "yup";
import moment from "moment";
import { CreditCard } from "../../types/credit-card.type";

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

const cardFormInitialValues: CreditCard = {
	number: 0,
	cvv: 0,
	owner: "",
	expirationMonth: 0,
	expirationYear: 0,
};

const cardValidation = Yup.object({
	number: Yup.number()
		.required("Required")
		.typeError("Invalid number")
		.min(1, "Invalid number"),
	cvv: Yup.number()
		.required("Required")
		.typeError("Invalid cvv")
		.min(1, "Invalid cvv")
		.max(999, "Invalid cvv"),
	owner: Yup.string().required("Required"),
	expirationMonth: Yup.number()
		.required("Required")
		.typeError("Invalid expiration month")
		.min(1, "Invalid expiration month")
		.max(12, "Invalid expiration month"),
	expirationYear: Yup.number()
		.required("Required")
		.typeError("Invalid expiration year")
		.min(1, "Invalid expiration year"),
});

export const BookingForm = () => {
	const cardForm = useFormik({
		initialValues: cardFormInitialValues,
		validationSchema: cardValidation,
		onSubmit: (values) => {},
	});

	const bookingForm = useFormik({
		initialValues: bookingFormInitialValues,
		validationSchema: bookingFormValidations,
		onSubmit: (values) => {
			if (!values.postPaidSelected) {
				cardForm.submitForm();
			}
		},
	});

	return (
		<Box mt={5}>
			<BookingSlectionForm form={bookingForm} />

			{!bookingForm.values.postPaidSelected && (
				<Box my={5}>
					<CreditCardForm form={cardForm} />
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
