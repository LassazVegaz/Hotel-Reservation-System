import axios from "axios";
import config from "../config.json";

export const appAxios = axios.create({
	baseURL: config.baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});
