import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { BookingSlectionForm } from "./BookingSelectionForm";
import { CreditCardForm } from "./CreditCardForm";
import { Booking } from "../../types/booking.type";
import * as Yup from "yup";
import moment from "moment";
import { CreditCard } from "../../types/credit-card.type";
import { useBookingsApi } from "../../hooks/bookings-api.hook";
import { useAppSelector } from "../../hooks/redux.hooks";
import { useNotifications } from "../../hooks/notifications.hook";
import { useNavigate } from "react-router-dom";

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

export const BookingForm = ({ reservationId }: { reservationId: number }) => {
	const { isBookingAvailable, createBooking } = useBookingsApi();
	const customerId = useAppSelector((s) => (s.auth ? s.auth.id : 0));
	const { showError } = useNotifications();
	const navigate = useNavigate();

	const cardForm = useFormik({
		initialValues: cardFormInitialValues,
		validationSchema: cardValidation,
		onSubmit: (_) => {
			book();
		},
	});

	const bookingForm = useFormik({
		initialValues: bookingFormInitialValues,
		validationSchema: bookingFormValidations,
		onSubmit: (values) => {
			if (!values.postPaidSelected) {
				cardForm.submitForm();
			} else {
				book();
			}
		},
	});

	const book = async () => {
		const fromDate = moment(bookingForm.values.fromDate, "DD/MM/YYYY");
		const toDate = moment(bookingForm.values.toDate, "DD/MM/YYYY");
		if (await isBookingAvailable(customerId, fromDate, toDate)) {
			const res = await createBooking({
				...bookingForm.values,
				customerId,
				reservationId,
				id: 0,
			});
			if (res) navigate("/");
		} else {
			showError(
				"Selected date range overlaps with an exisitng booked package"
			);
		}
	};

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
