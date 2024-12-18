import AuthorizedAxios  from "./AuthorizedAxios";

export class NotificationAPI {
    static async getNotifications(page = 1, size = 500) {
        try {
            const response = await AuthorizedAxios.get(`/api/notifications?page=${page}&size=${size}`);
            return response.data.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }
}