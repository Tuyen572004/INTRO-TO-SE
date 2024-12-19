import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
	name: "userSlice",
	initialState: {
		user: null
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		deleteUser: (state, action) => {
			state.user = null;
		},
	},
});

export const { setUser, deleteUser } = userSlice.actions;
export const userReducer = userSlice.reducer;