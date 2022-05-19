import { Booking } from "./booking.type";
import { Reservation } from "./hotel-reservation.type";
import { Hotel } from "./hotel.type";

export type AdvancedBookingData = {
	booking: Booking;
	reservation: Reservation;
	hotel: Hotel;
};
