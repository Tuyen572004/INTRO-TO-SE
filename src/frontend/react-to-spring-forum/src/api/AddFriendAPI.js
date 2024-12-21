import AuthorizedAxios from "./AuthorizedAxios";

export class AddFriendAPI {
    static async isFriend(friendId) {
        try {
            const response = await AuthorizedAxios.get(`api/requests/is-friend?friendId=${friendId}`);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async isAddFriendRequestSent(friendId) {
        try {
            const response = await AuthorizedAxios.get(`api/requests/is-add-friend-request-sent?friendId=${friendId}`);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async isAddFriendRequestReceived(friendId) {
        try {
            return await AuthorizedAxios.get(`api/requests/is-add-friend-request-received?friendId=${friendId}`);
        } catch (error) {
            console.error(error);
        }
    }

    static async addFriendResponse(data) {
        try {
            return await AuthorizedAxios.post(`api/requests/add-friend-response`, data);
        } catch (error) {
            console.error(error);
        }
    }

    static async addFriend(friendId) {
        try {
            return await AuthorizedAxios.post(`api/requests/add-friend?friendId=${friendId}`);
        } catch (error) {
            console.error(error);
        }
    }

    static async unfriend(friendId) {
        try {
            return await AuthorizedAxios.patch(`api/requests/unfriend?friendId=${friendId}`);
        } catch (error) {
            console.error(error);
        }
    }

    static async cancelFriendRequest(friendId) {
        try {
            return await AuthorizedAxios.delete(`api/requests/unsend-add-friend-request?friendId=${friendId}`);
        } catch (error) {
            console.error(error);
        }
    }

    static async getFriendRequests(type = "RECEIVED", page = 1, size = 10) {
        try {
            const response = await AuthorizedAxios.get(`api/requests/all-add-friend?type=${type}&page=${page}&size=${size}`);
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    }
}