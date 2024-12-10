import axios from 'axios';

const AuthorizedAxios = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': '*/*',
	},
});

AuthorizedAxios.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});
export default AuthorizedAxios;