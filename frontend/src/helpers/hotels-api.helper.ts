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

export const hotelsHelper = { createHotel };
