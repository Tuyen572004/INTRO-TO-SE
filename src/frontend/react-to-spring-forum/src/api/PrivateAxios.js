import axios from 'axios';

const PrivateAxios = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': '*/*'
	},
});

export const setAuthToken = (token) => {
	if (token) {
		PrivateAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete PrivateAxios.defaults.headers.common['Authorization'];
	}
};


export default PrivateAxios;