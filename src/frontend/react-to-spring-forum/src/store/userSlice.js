import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
	name: "userSlice",
	initialState: {
		user: {
			avatar: "https://api.dicebear.com/5.x/bottts/svg?seed=huper",
			username: "username",
			name: "name",
			description: "description",
			totalFollower: 0,
			facebook: "fb.com/gnuhuas",
			instagram: "ig.com/wang.xiu.xiong",
		},
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