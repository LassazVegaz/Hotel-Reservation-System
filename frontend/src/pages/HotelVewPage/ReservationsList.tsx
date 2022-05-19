import { BedroomChild as BedroomChildIcon } from "@mui/icons-material";
import {
	ListItemButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	Button,
	List,
	Typography,
} from "@mui/material";
import { UserRole } from "../../enums/user-role.enum";
import { useAppSelector } from "../../hooks/redux.hooks";
import { Reservation } from "../../types/hotel-reservation.type";

const ReservationItem = ({ reservation }: { reservation: Reservation }) => {
	const userRole = useAppSelector((s) =>
		s.auth ? s.auth.roleId : null
	) as UserRole;

	const secondaryText = (
		<>
			<Typography>
				Price: {Number(reservation.price).toFixed(2)}
			</Typography>
			<Typography>
				Taxi service available:{" "}
				{reservation.taxiServiceAvailable ? "Yes" : "No"}
			</Typography>
			<Typography>
				Post paid available: {reservation.allowPostPaid ? "Yes" : "No"}
			</Typography>
		</>
	);

	return (
		<ListItemButton>
			<ListItemAvatar>
				<Avatar>
					<BedroomChildIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={reservation.description}
				secondary={secondaryText}
			/>
			{userRole === UserRole.Customer && (
				<ListItemSecondaryAction>
					<Button variant="outlined">BOOK</Button>
				</ListItemSecondaryAction>
			)}
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
