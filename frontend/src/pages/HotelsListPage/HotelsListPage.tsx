import { Add as AddIcon } from "@mui/icons-material";
import {
	Container,
	Fab,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AddHotelDialog } from "../../components/AddHotelDialog/AddHotelDialog";
import { useHotelsApi } from "../../hooks/hotels-api.hook";
import { useAppSelector } from "../../hooks/redux.hooks";
import { Hotel } from "../../types/hotel.type";

const HotelsList = () => {
	const { getHotelsByAdmin } = useHotelsApi();
	const [hotels, setHotels] = useState([] as Hotel[]);
	const hotelAdminId = useAppSelector((s) => (s.auth ? s.auth.id : 0));

	useEffect(() => {
		getHotelsByAdmin(hotelAdminId).then((res) => {
			if (res) setHotels(res);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hotelAdminId]);

	return (
		<List>
			{hotels.map((hotel) => (
				<ListItemButton key={hotel.id}>
					<ListItemText
						primary={hotel.name}
						secondary={hotel.address}
					/>
				</ListItemButton>
			))}
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
