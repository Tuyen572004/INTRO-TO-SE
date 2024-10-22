import axios from "axios"
import config from "./config"

export class AuthenticationAPI {
	static refreshToken = async (data) => {
		return (await axios.post(`${config.BASE_URL}/auth/refresh`), {
			refreshToken: data
		}).data;
	}

	static authenticate = async (data) => {
		return (await axios.post(`${config.BASE_URL}/auth/authenticate`), {
			username: data.username,
			password: data.password
		})
	}

	static logout = async (data) => {
		return (await axios.post(`${config.BASE_URL}/auth/logout`), {
			token: data.token
		}).data;
	}
	static changePassword = async (data) => {
		return (await axios.patch(`${config.BASE_URL}/auth/change-password`), {
			oldPassword: data.oldPassword,
			newPassword: data.newPassword
		}).data;
	}
}