import { reservationsApiHelper } from "../helpers/hotel-reservations-api.helper";
import { hotelsApiHelper } from "../helpers/hotels-api.helper";
import { Reservation } from "../types/hotel-reservation.type";
import { Hotel } from "../types/hotel.type";
import { useApi } from "./api.hook";

export const useReservationsApi = () => {
	const api = useApi();

	const createReservation = async (
		hotelId: number,
		reservation: Reservation
	): Promise<Reservation | null> => {
		let newReservation: Reservation | null = null;

		await api(async () => {
			newReservation = await reservationsApiHelper.createReservation(
				hotelId,
				reservation
			);
		});

		return newReservation;
	};

	const getReservations = async (
		hotelId: number
	): Promise<Reservation[] | null> => {
		let reservations: Reservation[] | null = null;

		await api(
			async () => {
				reservations = await reservationsApiHelper.getReservations(
					hotelId
				);
			},
			{
				showErrorNotification: false,
				showSuccessNotification: false,
			}
		);

		return reservations;
	};

	const getReservationAndHotel = async (
		reservationId: number
	): Promise<{
		reservation: Reservation;
		hotel: Hotel;
	} | null> => {
		let reservation: Reservation | null = null;
		let hotel: Hotel | null = null;

		await api(
			async () => {
				reservation = await reservationsApiHelper.getReservation(
					reservationId
				);
				hotel = await hotelsApiHelper.getHotelById(reservation.hotelId);
			},
			{
				showErrorNotification: false,
				showSuccessNotification: false,
			}
		);

		return reservation && hotel
			? {
					reservation,
					hotel,
			  }
			: null;
	};

	return {
		createReservation,
		getReservations,
		getReservationAndHotel,
	};
};
