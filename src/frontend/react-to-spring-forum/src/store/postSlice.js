import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
	name: "postSlice",
	initialState: {
		posts: [],
	},
	reducers: {
		setPosts: (state, action) => {
			state.posts = action.payload;
		},

		addPost: (state, action) => {
			state.posts.unshift(action.payload);
		},

		updatePost: (state, action) => {
			const updatedPost = action.payload;
			state.posts = state.posts.map((post) =>
				post.id === updatedPost.id ? updatedPost : post
			);
		},

		deletePost: (state, action) => {
			state.posts = state.posts.filter((post) => post.id !== action.payload);
		},
	},
});

export const { setPosts, addPost, updatePost, deletePost } = postSlice.actions;
export const postReducer = postSlice.reducer;
