import moment from "moment";
import { Moment } from "moment";
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

	const isBookingAvailable = async (
		customerId: number,
		fromDate: Moment,
		toDate: Moment
	): Promise<boolean> => {
		let dates: BookingDateRange[] = [];

		await api(async () => {
			dates = await bookingsApiHelper.getBookedDates(customerId);
		});

		const dateIsBooked = dates.some((date) => {
			const _fromDate = moment(date.fromDate);
			const _toDate = moment(date.toDate);
			return (
				(fromDate.isSameOrAfter(_toDate, "day") &&
					fromDate.isSameOrBefore(_fromDate, "day")) ||
				(toDate.isSameOrAfter(_fromDate, "day") &&
					toDate.isSameOrBefore(_toDate, "day")) ||
				(fromDate.isSameOrBefore(_fromDate, "day") &&
					toDate.isSameOrAfter(_toDate, "day"))
			);
		});

		return !dateIsBooked;
	};

	return {
		createBooking,
		isBookingAvailable,
	};
};
