import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";

type AddHotelDialogProps = {
	open: boolean;
	onClose: () => void;
};

export const AddHotelDialog = ({ open, onClose }: AddHotelDialogProps) => {
	return (
		<Dialog open={open}>
			<DialogTitle>Add A New Hotel</DialogTitle>

			<Box component="form">
				<DialogContent
					sx={{
						display: "flex",
						flexDirection: "column",
						width: 500,
						rowGap: 2,
					}}
				>
					<TextField label="Name" />
					<TextField label="Address" />
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
