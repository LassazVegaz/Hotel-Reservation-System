import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormikMUITextField } from "../FormikMUITextField/FormikMUITextField";

type AddHotelDialogProps = {
	open: boolean;
	onClose: () => void;
};

const initialValues = {
	name: "",
	address: "",
};

const validationSchema = Yup.object({
	name: Yup.string().required("Hotel name is required"),
	address: Yup.string().required("Hotel address is required"),
});

export const AddHotelDialog = ({ open, onClose }: AddHotelDialogProps) => {
	const form = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values);
		},
		validationSchema,
	});

	return (
		<Dialog open={open}>
			<DialogTitle>Add A New Hotel</DialogTitle>

			<Box component="form" onSubmit={form.handleSubmit}>
				<DialogContent
					sx={{
						display: "flex",
						flexDirection: "column",
						width: 500,
						rowGap: 2,
					}}
				>
					<FormikMUITextField label="Name" form={form} name="name" />
					<FormikMUITextField
						label="Address"
						form={form}
						name="address"
					/>
				</DialogContent>

				<DialogActions>
					<Button
						variant="outlined"
						color="primary"
						onClick={() => {
							form.resetForm();
							onClose();
						}}
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
