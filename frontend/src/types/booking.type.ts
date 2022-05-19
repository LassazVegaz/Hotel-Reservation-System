export type Booking = {
	id: number;
	reservationId: number;
	customerId: number;
	fromDate: string;
	toDate: string;
	postPaidSelected: boolean;
	taxiSerivceSelected: boolean;
};
