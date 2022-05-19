import { BedroomChild as BedroomChildIcon } from "@mui/icons-material";
import {
	ListItemButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	Button,
	List,
} from "@mui/material";
import { Reservation } from "../../types/hotel-reservation.type";

const ReservationItem = ({ reservation }: { reservation: Reservation }) => {
	return (
		<ListItemButton>
			<ListItemAvatar>
				<Avatar>
					<BedroomChildIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={reservation.description}
				secondary={Number(reservation.price).toFixed(2)}
			/>
			<ListItemSecondaryAction>
				<Button variant="outlined">BOOK</Button>
			</ListItemSecondaryAction>
		</ListItemButton>
	);
};

export const ReservationsList = ({
	reservations,
}: {
	reservations: Reservation[];
}) => {
	return (
		<List>
			{reservations.map((res) => (
				<ReservationItem key={res.id} reservation={res} />
			))}
		</List>
	);
};
