import {
	Dialog,
	DialogTitle,
	Box,
	DialogContent,
	DialogActions,
	Button,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useReservationsApi } from "../../hooks/hotel-reservations.hook";
import { FormikMUITextField } from "../FormikMUITextField/FormikMUITextField";

type AddEditReservationDialogProps = {
	open: boolean;
	hotelId: number;
	onClose: (created: boolean) => void;
};

const validationSchema = Yup.object({
	price: Yup.number()
		.min(0, "Negative values are not allowed")
		.required("Required"),
	description: Yup.string().required("Required"),
});

const initialValues = {
	price: 0,
	description: "",
	allowPostPaid: false,
	taxiServiceAvailable: false,
};

export const AddEditReservationDialog = ({
	open,
	hotelId,
	onClose,
}: AddEditReservationDialogProps) => {
	const { createReservation } = useReservationsApi();
	const form = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			if (
				await createReservation(hotelId, {
					...values,
					hotelId,
					id: 0,
				})
			) {
				closeDialog(true);
			}
		},
	});

	const closeDialog = (created: boolean) => {
		form.resetForm();
		onClose(created);
	};

	return (
		<Dialog open={open}>
			<DialogTitle>Add A New Hotel Reservation</DialogTitle>

			<Box component="form" onSubmit={form.handleSubmit}>
				<DialogContent
					sx={{
						display: "flex",
						flexDirection: "column",
						width: 500,
						rowGap: 2,
					}}
				>
					<FormikMUITextField
						label="Price"
						form={form}
						name="price"
						type="number"
					/>
					<FormikMUITextField
						label="Description"
						form={form}
						name="description"
					/>
					<FormControlLabel
						control={<Checkbox />}
						value={form.values.allowPostPaid}
						onChange={form.handleChange}
						name="allowPostPaid"
						label="Allow Post Paid"
					/>
					<FormControlLabel
						control={<Checkbox />}
						value={form.values.taxiServiceAvailable}
						name="taxiServiceAvailable"
						onChange={form.handleChange}
						label="Taxi Service Available"
					/>
				</DialogContent>

				<DialogActions>
					<Button
						variant="outlined"
						color="primary"
						onClick={() => closeDialog(false)}
					>
						Cancel
					</Button>
					<Button variant="contained" color="primary" type="submit">
						Create
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};
