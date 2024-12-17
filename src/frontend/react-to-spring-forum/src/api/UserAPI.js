import Axios from "./Axios.js";
import AuthorizedAxios from "./AuthorizedAxios";

export class UserAPI {
	static async authenticate(data) {
		const response = await Axios.post("/api/auth", {
			username: data.username,
			password: data.password,
		});

		return response.data;
	}

	static async logout(data) {
		const response = await Axios.post("/api/auth/logout", {
			token: data.token,
		});

		return response.data;
	}

	static async changePassword(data) {
		console.log("data", data);
		
		const response = await AuthorizedAxios.patch("/api/auth/change-password", {
			oldPassword: data.currentPassword,
			newPassword: data.newPassword,
			verificationCode: data.verificationCode,
		});
		return response.data;
	}

	static async forgotPassword(data) {
		const response = await Axios.post("/api/auth/forget-password", {
			newPassword: data.newPassword,
			verificationCode: data.verificationCode,
		});
		return response.data;
	}

	static async register(data) {
		try {
			const response = await Axios.post("/api/users", data);
			return response.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}

	static async getMyAccount() {
		try {
			const response = await AuthorizedAxios.get(`/api/users/my-account`);
			return response.data;
		} catch (error) {
			console.error("API Error:", error.response || error.message);
			throw error;
		}
	}

	static async refreshToken(data) {
		const response = await Axios.post("/api/auth/refresh", {
			refreshToken: data,
		});
		return response.data;
	}

	static async sendVerificationCode(data) {
		const response = await Axios.post("/api/verify/send-code", {
			email: data,
		});
		return response.data;
	}

	static async verifyCode(data) {
		const response = await Axios.get(`/api/verify?userId=${data.userId}&verificationCode=${data.verificationCode}`);
		return response.data;
	}
	// static async resendVerificationEmail(data) {
	// 	const response = await Axios.post("/api/auth/send-link", {
	// 		email: data.email,
	// 	});
	// 	return response.data;
	// }
}
