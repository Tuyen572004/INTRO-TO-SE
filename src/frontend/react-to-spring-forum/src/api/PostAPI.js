import PrivateAxiosAxios from "./PrivateAxios";

export class PostAPI {
	static async create(data) {
		const response = await PrivateAxiosAxios.post("/api/post", data);
		return response.data;
	}
}
