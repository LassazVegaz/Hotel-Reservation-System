import { bookingsApiHelper } from "../helpers/bookings-api.helper";
import { Booking } from "../types/booking.type";
import { useApi } from "./api.hook";

export const useBookingsApi = () => {
	const api = useApi();

	const createBooking = async (booking: Booking): Promise<Booking | null> => {
		let newBooking: Booking | null = null;

		await api(async () => {
			newBooking = await bookingsApiHelper.createBooking(booking);
		});

		return newBooking;
	};

	return {
		createBooking,
	};
};
