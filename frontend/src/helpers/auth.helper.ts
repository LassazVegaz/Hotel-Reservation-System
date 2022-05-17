const TOKEN_KEY = "_";

export const authHelper = {
	setToken: (token: string) => {
		localStorage.setItem(TOKEN_KEY, token);
	},
	getToken: () => {
		return localStorage.getItem(TOKEN_KEY);
	},
	removeToken: () => {
		localStorage.removeItem(TOKEN_KEY);
	},
};
