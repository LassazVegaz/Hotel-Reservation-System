import {
	Button,
	Box,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import { Formik } from "formik";

export const CreateAcountForm = () => {
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
				<TextField label="Name" />
				<TextField label="Mobile number" type="tel" />
				<TextField label="Email" type="email" />
				<TextField label="Password" type="password" />
				<TextField label="Confirm passowrd" type="password" />

				<ToggleButtonGroup exclusive fullWidth>
					<ToggleButton value="traveler">Traveler</ToggleButton>
					<ToggleButton value="hotel-admin">Hotel Admin</ToggleButton>
				</ToggleButtonGroup>

				<Button
					variant="contained"
					sx={{
						mt: 3,
					}}
				>
					Sign Up
				</Button>
				<Button variant="contained">Sign In</Button>
			</Box>
		</Formik>
	);
};
