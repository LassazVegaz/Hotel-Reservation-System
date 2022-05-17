import { Box, TextField, Button } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
	const navigate = useNavigate();

	return (
		<Formik
			initialValues={{}}
			onSubmit={() => {
				console.log("creating");
			}}
		>
			<Box
				component="form"
				display="flex"
				flexDirection="column"
				rowGap={3}
			>
				<TextField label="Email" type="email" />
				<TextField label="Password" type="password" />

				<Button
					sx={{
						mt: 3,
					}}
					variant="contained"
				>
					Sign In
				</Button>
				<Button variant="contained" onClick={() => navigate("/")}>
					Sign Up
				</Button>
			</Box>
		</Formik>
	);
};
