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

const getReservations = async (hotelId: number) => {
	try {
		const url = endpoints.reservations.common.replace(
			"{hotelId}",
			hotelId.toString()
		);
		const res = await appAxios.get<Reservation[]>(url);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getReservation = async (reservationId: number) => {
	try {
		const url = `${endpoints.reservations.common}/${reservationId}`;
		const res = await appAxios.get<Reservation>(url);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const reservationsApiHelper = {
	createReservation,
	getReservations,
	getReservation,
};
