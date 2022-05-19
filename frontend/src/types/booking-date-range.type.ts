import { Booking } from "./booking.type";

export type BookingDateRange = Pick<Booking, "fromDate" | "toDate">;
