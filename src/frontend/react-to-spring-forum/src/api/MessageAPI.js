import Axios from "./Axios";
import AuthorizedAxios from "./AuthorizedAxios";
export class MessageAPI {
	static async getMyChatRooms(page, size) {
		return AuthorizedAxios.get(`/chat-rooms/my-chat-rooms?page=${page}&size=${size}`);
	}

	static async getDirectChatRoom(senderId, recipientId) {
		return Axios.get(`/api/chat-rooms/my-chat-rooms?senderId=${senderId}&recipientId=${recipientId}`);
	}

	static async getChatRoomMessages(chatId, page, size) {
		return Axios.get(`/api/messages?chatId=${chatId}&page=${page}&size=${size}`);
	}
}

