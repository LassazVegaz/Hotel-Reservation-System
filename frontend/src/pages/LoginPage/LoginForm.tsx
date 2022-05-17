import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FormikMUITextField } from "../../components/FormikMUITextField/FormikMUITextField";

const validationSchema = Yup.object({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string().required("Required"),
});

const initialValues = {
	email: "",
	password: "",
};

export const LoginForm = () => {
	const navigate = useNavigate();
	const form = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log(values);
		},
		validationSchema,
	});

	return (
		<Box
			component="form"
			display="flex"
			flexDirection="column"
			rowGap={3}
			onSubmit={form.handleSubmit}
		>
			<FormikMUITextField label="Email" name="email" form={form} />
			<FormikMUITextField
				label="Password"
				name="password"
				form={form}
				type="password"
			/>

			<Button
				sx={{
					mt: 3,
				}}
				variant="contained"
				type="submit"
			>
				Sign In
			</Button>
			<Button
				color="secondary"
				variant="contained"
				onClick={() => navigate("/")}
			>
				Sign Up
			</Button>
		</Box>
	);
};
