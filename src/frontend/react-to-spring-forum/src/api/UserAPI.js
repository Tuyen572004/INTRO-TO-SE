import Axios from "./Axios.js";

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
		const response = await Axios.patch("/api/auth/change-password", {
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
		});
		return response.data;
	}

	static async register(data) {
		const response = await Axios.post("/api/users", data);
		return response.data;
	}

	static async refreshToken(data) {
		const response = await Axios.post("/api/auth/refresh", {
			refreshToken: data,
		});
		return response.data;
	}

	// static async resendVerificationEmail(data) {
	// 	const response = await Axios.post("/api/auth/send-link", {
	// 		email: data.email,
	// 	});
	// 	return response.data;
	// }
}
