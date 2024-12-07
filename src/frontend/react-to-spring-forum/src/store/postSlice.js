import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
	name: "postSlice",
	initialState: {
		post: {},
	},
	reducers: {
		setPost: (state, action) => {
			state.post = action.payload;
		},
	},
});

export const { setPost } = postSlice.actions;
export const postReducer = postSlice.reducer;
