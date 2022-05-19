import {
	Dialog,
	DialogTitle,
	Box,
	DialogContent,
	DialogActions,
	Button,
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
