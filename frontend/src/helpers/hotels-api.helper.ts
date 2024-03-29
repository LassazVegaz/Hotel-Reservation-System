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

const getAllHotels = async (): Promise<Hotel[]> => {
	try {
		const res = await appAxios.get<Hotel[]>(endpoints.hotels.common);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const getHotelById = async (hotelId: number): Promise<Hotel> => {
	try {
		const url = `${endpoints.hotels.common}/${hotelId}`;
		const res = await appAxios.get<Hotel>(url);
		return res.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const hotelsApiHelper = {
	createHotel,
	getHotelsByAdmin,
	getAllHotels,
	getHotelById,
};
