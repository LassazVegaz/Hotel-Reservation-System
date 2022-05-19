export type Booking = {
	id: string;
	reservationId: number;
	customerId: number;
	fromDate: Date;
	toDate: Date;
	postPaidSelected: boolean;
	taxiSerivceSelected: boolean;
};
