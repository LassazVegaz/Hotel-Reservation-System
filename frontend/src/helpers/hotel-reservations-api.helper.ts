import endpoints from "../api-endpoints.json";
import { Reservation } from "../types/hotel-reservation.type";
import { appAxios } from "./api.helpers";

const createReservation = async (reservation: Reservation) => {
	try {
		const res = await appAxios.post<Reservation>(
			endpoints.reservations.common,
			reservation
		);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const reservationsApiHelper = {
	createReservation,
};
