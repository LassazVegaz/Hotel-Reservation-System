import moment from "moment";
import { Moment } from "moment";
import { bookingsApiHelper } from "../helpers/bookings-api.helper";
import { reservationsApiHelper } from "../helpers/hotel-reservations-api.helper";
import { hotelsApiHelper } from "../helpers/hotels-api.helper";
import { BookingDateRange } from "../types/booking-date-range.type";
import { Booking } from "../types/booking.type";
import { AdvancedBookingData } from "../types/advanced-booking-data.type";
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

	const getBookings = async (
		customerId: number
	): Promise<AdvancedBookingData[]> => {
		let bookings: AdvancedBookingData[] = [];

		await api(
			async () => {
				const _bookings = await bookingsApiHelper.getBookings(
					customerId
				);
				for (let i = 0; i < _bookings.length; i++) {
					const booking = _bookings[i];
					const reservation =
						await reservationsApiHelper.getReservation(
							booking.reservationId
						);
					const hotel = await hotelsApiHelper.getHotelById(
						reservation.hotelId
					);

					bookings.push({
						booking,
						reservation,
						hotel,
					});
				}
			},
			{
				showErrorNotification: false,
				showSuccessNotification: false,
			}
		);

		return bookings;
	};

	const cancelBooking = async (bookingId: number): Promise<boolean> => {
		try {
			await api(
				async () => {
					await bookingsApiHelper.cancelBooking(bookingId);
				},
				{
					handleError: false,
				}
			);
		} catch (error) {
			return false;
		}

		return true;
	};

	return {
		createBooking,
		isBookingAvailable,
		getBookings,
		cancelBooking,
	};
};
