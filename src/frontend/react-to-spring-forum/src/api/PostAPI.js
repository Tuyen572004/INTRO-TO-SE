import PrivateAxiosAxios from "./PrivateAxios";
import Axios from "./Axios";
import AuthorizedAxios from "./AuthorizedAxios";

export class PostAPI {
	static async create(data) {
		try {
			const response = await AuthorizedAxios.post("/api/posts", data);
			return response.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}

	static async update(data) {
		const response = await PrivateAxiosAxios.put(`/api/posts`, data);
		return response.data;
	}

	static async get(id) {
		const response = await Axios.get(`/api/posts/${id}`);
		return response.data;
	}
}
