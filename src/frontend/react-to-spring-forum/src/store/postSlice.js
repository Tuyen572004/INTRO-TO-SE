import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
	name: "postSlice",
	initialState: {
		post: {},
	},
	reducers: {
		addPost(state, action) {
			state.post = action.payload;
		},
	},
});

export const { addPost } = postSlice.actions;
export const postReducer = postSlice.reducer;
