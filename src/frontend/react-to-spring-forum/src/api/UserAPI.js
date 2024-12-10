import Axios from "./Axios.js";
import AuthorizedAxios from "./AuthorizedAxios";

export class UserAPI {
	static async register(data) {
		try {
			const response = await Axios.post("/api/users", data);
			return response.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}

	static async getMyAccount() {
		try {
			const response = await AuthorizedAxios.get(`/api/users/my-account`);
			return response.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}
}
