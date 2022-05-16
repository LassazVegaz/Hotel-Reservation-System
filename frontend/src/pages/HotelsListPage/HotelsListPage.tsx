import { Add as AddIcon } from "@mui/icons-material";
import {
	Container,
	Fab,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { AddHotelDialog } from "../../components/AddHotelDialog/AddHotelDialog";

const HotelsList = () => {
	return (
		<List>
			<ListItemButton>
				<ListItemText primary="Hotel 1" secondary="Address 1" />
			</ListItemButton>
			<ListItemButton>
				<ListItemText primary="Hotel 1" secondary="Address 1" />
			</ListItemButton>
			<ListItemButton>
				<ListItemText primary="Hotel 1" secondary="Address 1" />
			</ListItemButton>
		</List>
	);
};

export const HotelsListPage = () => {
	const [openDialog, setOpenDialog] = useState(false);

	return (
		<>
			<Container
				sx={{
					position: "relative",
					my: 3,
				}}
			>
				<Typography variant="h4" textAlign="center">
					Your Hotels
				</Typography>

				<HotelsList />

				<Fab
					sx={{
						right: 0,
						bottom: 0,
						position: "absolute",
					}}
					onClick={() => setOpenDialog(true)}
				>
					<AddIcon />
				</Fab>
			</Container>

			<AddHotelDialog
				open={openDialog}
				onClose={() => setOpenDialog(false)}
			/>
		</>
	);
};
