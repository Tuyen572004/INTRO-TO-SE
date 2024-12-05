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
}
