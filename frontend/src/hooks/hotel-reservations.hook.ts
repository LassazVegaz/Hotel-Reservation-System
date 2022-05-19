import { reservationsApiHelper } from "../helpers/hotel-reservations-api.helper";
import { Reservation } from "../types/hotel-reservation.type";
import { useApi } from "./api.hook";

export const useReservations = () => {
	const api = useApi();

	const createReservation = async (
		reservation: Reservation
	): Promise<Reservation | null> => {
		let newReservation: Reservation | null = null;

		await api(async () => {
			newReservation = await reservationsApiHelper.createReservation(
				reservation
			);
		});

		return newReservation;
	};

	return {
		createReservation,
	};
};
