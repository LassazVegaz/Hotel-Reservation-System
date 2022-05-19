export type Reservation = {
	id: number;
	description: string;
	price: number;
	hotelId: number;
	allowPostPaid: boolean;
	taxiServiceAvailable: boolean;
};
