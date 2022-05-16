import { Box, Typography } from "@mui/material";
import { CreateAcountForm } from "./CreateAcountForm";

export const CreateAccountPage = () => {
	return (
		<Box display="flex" justifyContent="center">
			<Box my={10} minWidth={500}>
				<Typography
					variant="h4"
					mb={5}
					textAlign="center"
					fontWeight="bold"
				>
					SignUp Today
				</Typography>

				<CreateAcountForm />
			</Box>
		</Box>
	);
};
