const validateUsername = (username) => {
	const usernameRegex = /^[a-zA-Z0-9]{5,}$/;
	return usernameRegex.test(username);
};

export default validateUsername;