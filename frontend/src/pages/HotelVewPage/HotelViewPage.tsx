import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HotelDetailsCard } from "../../components/HotelDetailsCard/HotelDetailsCard";
import { useHotelsApi } from "../../hooks/hotels-api.hook";
import { Hotel } from "../../types/hotel.type";
import { HotelReservations } from "./HotelReservations";

export const HotelViewPage = () => {
	const params = useParams<{ id: string }>();
	const [hotel, setHotel] = useState<Hotel | null>(null);
	const { getHotelById } = useHotelsApi();

	useEffect(() => {
		let isSubscribed = true;

		if (params.id) {
			getHotelById(parseInt(params.id)).then(
				(hotel) => isSubscribed && hotel && setHotel(hotel)
			);
		}
		return () => {
			isSubscribed = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id]);

	return hotel ? (
		<Container
			sx={{
				my: 10,
			}}
		>
			<HotelDetailsCard hotel={hotel} />

			<HotelReservations />
		</Container>
	) : null;
};
