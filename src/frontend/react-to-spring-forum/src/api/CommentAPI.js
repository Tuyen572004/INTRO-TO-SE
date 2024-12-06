import PrivateAxios from "./PrivateAxios";
import Axios from "./Axios";

export class CommentAPI {
    static async getAllCommentByPostId(postId) {
        const response = await Axios.get(`/api/comments?post_id=${postId}`);
        return response.data;
    }

    static async create(data) {
        const response = await PrivateAxios.post("/api/comments", data);
        return response.data;
    }

    static async update(data) {
        const response = await PrivateAxios.put(`/api/comments`, data);
        return response.data;
    }

    static async delete(id) {
        const response = await PrivateAxios.delete(`/api/comments/${id}`);
        return response.data;
    }
}