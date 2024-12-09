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
		try {
			const response = await AuthorizedAxios.put("/api/posts", data);
			return response.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}

	static async delete(id) {
		try {
			const response = await AuthorizedAxios.delete(`/api/posts/${id}`);
			return response.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}

	static async get(id) {
		try {
			const response = await Axios.get(`/api/posts/${id}`);
			return response.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}

	static async getAll(page = 1, size = 5) {
		try {
			const response = await Axios.get(`/api/posts/pagination?title=&page=${page}&size=${size}`);
			const posts = response.data.data.data;

			// Shuffle the posts randomly
			const shuffledPosts = posts.sort(() => Math.random() - 0.5);
			return shuffledPosts;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}
}
