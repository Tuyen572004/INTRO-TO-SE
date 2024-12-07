import AuthorizedAxios from "./AuthorizedAxios";
import Axios from "./Axios";

export class CommentAPI {
    static async getAllCommentByPostId(postId) {
        try {
            const response = await Axios.get(`/api/comments?post_id=${postId}`);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }

    static async create(data) {
        try {
            const response = await AuthorizedAxios.post(`/api/comments`, data);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }

    static async update(data) {
        try {
            const response = await AuthorizedAxios.put(`/api/comments`, data);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const response = await AuthorizedAxios.delete(`/api/comments/${id}`);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }
}