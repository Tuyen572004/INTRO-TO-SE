import AuthorizedAxios from "./AuthorizedAxios";

export class UserProfileAPI {
    static async update(id, data) {
        try {
            const response = await AuthorizedAxios.put(`/api/user-profiles?userId=${id}`, data);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }

    static async get() {
        try {
            const response = await AuthorizedAxios.get("/api/user-profiles/my-profile");
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }
}