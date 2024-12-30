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
			const response = await AuthorizedAxios.get(`/api/posts/${id}`);
			return response.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}

	static async getAll(page = 1, size = 10) {
		try {
			const response = await AuthorizedAxios.get(`/api/posts/dashboard?page=${page}&size=${size}`);
			console.log(response.data.data);
			return response.data.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}

	static async getMyPosts(page = 1, size = 10) {
		try {
			const response = await AuthorizedAxios.get(`/api/posts/my-posts?page=${page}&size=${size}`);
			return response.data.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}

	static async getPostsByUserId(userId, page = 1, size = 10) {
		try {
			const response = await AuthorizedAxios.get(`/api/posts/pagination/users/${userId}?page=${page}&size=${size}`);
			return response.data.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}

	static async searchPostsByTitle(title, page = 1, size = 10) {
		try {
			const response = await AuthorizedAxios.get(`/api/posts/pagination?title=${title}&page=${page}&size=${size}`);
			return response.data.data.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}

	static async countPosts() {
		try {
			const response = await AuthorizedAxios.get("/api/posts/count");
			return response.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}
}
