import { bookingsApiHelper } from "../helpers/bookings-api.helper";
import { BookingDateRange } from "../types/booking-date-range.type";
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

	const getDates = async (
		customerId: number
	): Promise<BookingDateRange[] | null> => {
		let dates: BookingDateRange[] | null = null;

		await api(async () => {
			dates = await bookingsApiHelper.getBookedDates(customerId);
		});

		return dates;
	};

	return {
		createBooking,
		getDates,
	};
};
