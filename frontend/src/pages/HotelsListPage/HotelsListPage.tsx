import {
	Container,
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
				my: 3,
			}}
		>
			<Typography variant="h4" textAlign="center">
				Your Hotels
			</Typography>

			<HotelsList />
		</Container>
	);
};
