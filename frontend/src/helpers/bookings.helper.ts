import endpoints from "../api-endpoints.json";
import { Booking } from "../types/booking.type";
import { appAxios } from "./api.helpers";

const createBooking = async (booking: Booking) => {
	try {
		const res = await appAxios.post<Booking>(
			endpoints.bookings.common,
			booking
		);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const bookingsApiHelper = {
	createBooking,
};
