import { Add as AddIcon } from "@mui/icons-material";
import {
	Container,
	Fab,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";

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
	return (
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
			>
				<AddIcon />
			</Fab>
		</Container>
	);
};
