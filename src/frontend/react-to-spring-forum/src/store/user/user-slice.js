import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
	name: "userSlice",
	initialState: {
		user: null,
	},
	reducers: {
		setUser: (currentSlice, action) => {
			currentSlice.user = action.payload;
		},
		deleteUser: (currentSlice, action) => {
			currentSlice.user = null;
		},
	},
});

export const { setUser, deleteUser } = userSlice.actions;
export const userReducer = userSlice.reducer;