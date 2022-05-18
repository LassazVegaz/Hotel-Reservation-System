import axios from "axios";
import config from "../config.json";
import { authHelper } from "./auth.helper";

const createAxios = () => {
	const _axios = axios.create({
		baseURL: config.baseUrl,
		headers: {
			"Content-Type": "application/json",
		},
	});

	_axios.interceptors.request.use((config) => {
		const authData = authHelper.getAuthData();

		if (config.headers) {
			// add or remove auth headers
			if (authData) {
				config.headers[
					"Authorization"
				] = `Bearer ${authData.access_token}`;
			} else if (typeof config.headers["Authorization"] !== "undefined") {
				delete config.headers["Authorization"];
			}
		}

		return config;
	});

	return _axios;
};

export const appAxios = createAxios();
