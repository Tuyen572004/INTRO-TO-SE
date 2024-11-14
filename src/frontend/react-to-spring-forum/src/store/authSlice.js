import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "authSlice",
	initialState: {
		login: {
			user: null,
			isFetching: false,
			error: false
		},
	},
	reducers: {
		loginStart: (state, action) => {
			state.login.isFetching = true;
			state.login.error = false;
		},
	},
	loginSuccess: (state, action) => {
		state.login.isFetching = false;
		state.login.user = action.payload;
		state.login.error = false;
	},
	loginFailed: (state, action) => {
		state.login.isFetching = false;
		state.login.error = true;
	},
});

export const { loginStartm, loginSuccess, loginFailed } = authSlice.actions;
export const authReducer = authSlice.reducer;