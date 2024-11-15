import Axios from "./Axios.js";

export class UserAPI {
	static async register(data) {
		const response = await Axios.post("/api/users", data);
		return response.data;
	}
}
