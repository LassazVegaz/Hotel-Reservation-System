import endpoints from "../api-endpoints.json";
import { Booking } from "../types/booking.type";
import { appAxios } from "./api.helpers";
import { BookingDateRange } from "../types/booking-date-range.type";

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

const getBookedDates = async (customerId: number) => {
	try {
		const url = endpoints.bookings.customers.dates.replace(
			"{customerId}",
			customerId.toString()
		);

		const res = await appAxios.get<BookingDateRange[]>(url);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const bookingsApiHelper = {
	createBooking,
	getBookedDates,
};
