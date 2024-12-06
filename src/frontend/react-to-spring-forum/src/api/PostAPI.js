import PrivateAxiosAxios from "./PrivateAxios";
import Axios from "./Axios";

export class PostAPI {
	static async create(data) {
		const response = await PrivateAxiosAxios.post("/api/post", data);
		return response.data;
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
