import { Box, Typography } from "@mui/material";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
	return (
		<Box display="flex" justifyContent="center">
			<Box mt={10} mb={15.6} minWidth={500}>
				<Typography
					variant="h4"
					mb={5}
					textAlign="center"
					fontWeight="bold"
				>
					SignIn Now
				</Typography>

				<LoginForm />
			</Box>
		</Box>
	);
};
