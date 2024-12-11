import AuthorizedAxios from "./AuthorizedAxios";

export class ReactAPI {
    static async create(postId) {
        try {
            const response = await AuthorizedAxios.post(`/api/reacts?postId=${postId}`);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }

    static async delete(postId) {
        try {
            const response = await AuthorizedAxios.delete(`/api/reacts?postId=${postId}`);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }
}