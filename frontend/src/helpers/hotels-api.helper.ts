import endpoints from "../api-endpoints.json";
import { Hotel } from "../types/hotel.type";
import { appAxios } from "./api.helpers";

const createHotel = async (hotel: Hotel) => {
	try {
		const res = await appAxios.post<Hotel>(endpoints.hotels.common, hotel);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getHotelsByAdmin = async (hotelAdminId: number): Promise<Hotel[]> => {
	try {
		const url = `${endpoints.hotels.getHotelsByAdmin}/${hotelAdminId}`;
		const res = await appAxios.get<Hotel[]>(url);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const hotelsApiHelper = { createHotel, getHotelsByAdmin };
