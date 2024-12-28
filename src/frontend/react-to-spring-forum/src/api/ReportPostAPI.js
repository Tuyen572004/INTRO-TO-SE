import AuthorizedAxios from "./AuthorizedAxios";

export class ReportPostAPI {
    static async isReported(postId) {
        try {
            const response = await AuthorizedAxios.get(`/api/report-posts/is-reported?postId=${postId}`);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }

    static async report(data) {
        try {
            const response = await AuthorizedAxios.post(`/api/report-posts/report`, data);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }

    static async unReport(postId) {
        try {
            const response = await AuthorizedAxios.delete(`/api/report-posts/report?postId=${postId}`);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }

    static async deletebyId(id) {
        try {
            const response = await AuthorizedAxios.delete(`/api/report-posts/delete/${id}`);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }

    static async reportResponse(data) {
        try {
            const response = await AuthorizedAxios.post(`/api/report-posts/response`, data);
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }

    static async getReports(page, size = 10) {
        try {
            const response = await AuthorizedAxios.get(`/api/report-posts/all?page=${page}&size=${size}`);
            return response.data.data;
        } catch (error) {
            console.error("API Error:", error.response || error.message);
            throw error;
        }
    }
}