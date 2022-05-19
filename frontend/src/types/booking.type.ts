export type Booking = {
	id: string;
	reservationId: number;
	customerId: number;
	fromDate: string;
	toDate: string;
	postPaidSelected: boolean;
	taxiSerivceSelected: boolean;
};
