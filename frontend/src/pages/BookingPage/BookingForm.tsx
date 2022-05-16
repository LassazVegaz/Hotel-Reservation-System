import { Box, Button } from "@mui/material";
import { BookingSlectionForm } from "./BookingSelectionForm";

export const BookingForm = () => {
	return (
		<Box mt={5}>
			<BookingSlectionForm />

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
				<Button variant="contained" color="primary">
					Book
				</Button>
			</Box>
		</Box>
	);
};
