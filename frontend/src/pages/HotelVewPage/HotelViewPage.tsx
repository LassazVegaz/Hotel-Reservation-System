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

	const hotelId = params.id ? parseInt(params.id) : undefined;

	useEffect(() => {
		let isSubscribed = true;

		if (hotelId) {
			getHotelById(hotelId).then(
				(hotel) => isSubscribed && hotel && setHotel(hotel)
			);
		}
		return () => {
			isSubscribed = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id]);

	return hotel && hotelId ? (
		<Container
			sx={{
				my: 10,
			}}
		>
			<HotelDetailsCard hotel={hotel} />

			<HotelReservations hotelId={hotelId} />
		</Container>
	) : null;
};
