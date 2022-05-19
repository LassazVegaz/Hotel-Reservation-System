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
import { UserRole } from "../../enums/user-role.enum";
import { useHotelsApi } from "../../hooks/hotels-api.hook";
import { useAppSelector } from "../../hooks/redux.hooks";
import { Hotel } from "../../types/hotel.type";

const HotelsList = ({ hotels }: { hotels: Hotel[] }) => {
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
	const { getHotelsByAdmin, getAllHotels } = useHotelsApi();
	const [hotels, setHotels] = useState([] as Hotel[]);
	const authData = useAppSelector((s) =>
		s.auth ? s.auth : { id: 0, roleId: 0 }
	);
	const [openDialog, setOpenDialog] = useState(false);

	const getHotels = async () => {
		const hotels = await (authData.roleId === UserRole.HotelAdmin
			? getHotelsByAdmin(authData.id)
			: getAllHotels());
		if (hotels) setHotels(hotels);
	};

	useEffect(() => {
		getHotels();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authData]);

	const title =
		authData.roleId === UserRole.HotelAdmin
			? "Your Hotels"
			: "Choose a Convenient Hotel";

	return (
		<>
			<Container
				sx={{
					position: "relative",
					my: 3,
				}}
			>
				<Typography variant="h4" textAlign="center">
					{title}
				</Typography>

				<HotelsList hotels={hotels} />

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
				onClose={(created) => {
					if (created) getHotels();
					setOpenDialog(false);
				}}
			/>
		</>
	);
};
