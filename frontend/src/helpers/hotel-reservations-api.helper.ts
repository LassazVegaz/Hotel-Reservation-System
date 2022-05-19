import endpoints from "../api-endpoints.json";
import { Reservation } from "../types/hotel-reservation.type";
import { appAxios } from "./api.helpers";

const createReservation = async (hotelId: number, reservation: Reservation) => {
	try {
		const url = endpoints.reservations.common.replace(
			"{hotelId}",
			hotelId.toString()
		);
		const res = await appAxios.post<Reservation>(url, reservation);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const reservationsApiHelper = {
	createReservation,
};
