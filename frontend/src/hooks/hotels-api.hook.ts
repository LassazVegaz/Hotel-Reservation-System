import { hotelsApiHelper } from "../helpers/hotels-api.helper";
import { Hotel } from "../types/hotel.type";
import { useApi } from "./api.hook";

export const useHotelsApi = () => {
	const api = useApi();

	const createHotel = async (hotel: Hotel): Promise<Hotel | null> => {
		let newHotel: Hotel | null = null;

		await api(async () => {
			newHotel = await hotelsApiHelper.createHotel(hotel);
		});

		return newHotel;
	};

	const getHotelsByAdmin = async (
		hotelAdminId: number
	): Promise<Hotel[] | null> => {
		let hotels: Hotel[] | null = null;

		await api(
			async () => {
				hotels = await hotelsApiHelper.getHotelsByAdmin(hotelAdminId);
			},
			{
				showSuccessNotification: false,
				showErrorNotification: false,
			}
		);

		return hotels;
	};

	return { createHotel, getHotelsByAdmin };
};
