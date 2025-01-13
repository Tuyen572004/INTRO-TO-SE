import Axios from "./Axios";
import AuthorizedAxios from "./AuthorizedAxios";
export class MessageAPI {
	static async getMyChatRooms(page, size, search = '') {
		try {
			const response = await AuthorizedAxios.get(`/api/chat-rooms/my-chat-rooms?page=${page}&size=${size}&chatroomName=${search}`);
			return response.data;
		}
		catch (error) {
			console.error("Error fetching chat rooms:", error);
		}
	}

	static async getDirectChatRoom(senderId, recipientId) {
		try {
			const response = await AuthorizedAxios.get(`/api/chat-rooms/my-chat-rooms?senderId=${senderId}&recipientId=${recipientId}`);
			return response.data;
		}
		catch (error) {
			console.error("Error fetching chat rooms:", error);
		}
	}

	static async getChatRoomMessages(chatId, page, size) {
		try {
			const response = await AuthorizedAxios.get(`/api/messages?chatId=${chatId}&page=${page}&size=${size}`);
			return response.data;
		}
		catch (error) {
			console.error("Error fetching messages:", error);
		}
	}

	static async createChatRoom(chatRoomName, participantIds) {
		try {
			const response = await AuthorizedAxios.post(`/api/chat-rooms`, { chatRoomName, participantIds });
			return response.data;
		}
		catch (error) {
			console.error("Error creating chat room:", error);
		}
	};

}

