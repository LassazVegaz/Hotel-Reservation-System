import {
	Dialog,
	DialogTitle,
	Box,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from "@mui/material";

type AddEditReservationDialogProps = {
	open: boolean;
	onClose: () => void;
};

export const AddEditReservationDialog = ({
	open,
	onClose,
}: AddEditReservationDialogProps) => {
	return (
		<Dialog open={open}>
			<DialogTitle>Add A New Hotel Reservation</DialogTitle>

			<Box component="form">
				<DialogContent
					sx={{
						display: "flex",
						flexDirection: "column",
						width: 500,
						rowGap: 2,
					}}
				>
					<TextField label="Price" />
					<TextField label="Description" />
				</DialogContent>

				<DialogActions>
					<Button
						variant="outlined"
						color="primary"
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={onClose}
					>
						Create
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
};
