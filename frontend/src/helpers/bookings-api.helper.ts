import endpoints from "../api-endpoints.json";
import { Booking } from "../types/booking.type";
import { appAxios } from "./api.helpers";
import { BookingDateRange } from "../types/booking-date-range.type";
import moment from "moment";
import { dateWithTimeZone } from "./date.helpers";

const createBooking = async (booking: Booking) => {
	try {
		const data = {
			...booking,
			fromDate: dateWithTimeZone(moment(booking.fromDate, "DD/MM/YYYY")),
			toDate: dateWithTimeZone(moment(booking.toDate, "DD/MM/YYYY")),
		};
		const res = await appAxios.post<Booking>(
			endpoints.bookings.common,
			data
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

const getBookings = async (customerId: number) => {
	try {
		const url = `${endpoints.bookings.customers.common}/${customerId}`;
		const res = await appAxios.get<Booking[]>(url);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const bookingsApiHelper = {
	createBooking,
	getBookedDates,
	getBookings,
};
