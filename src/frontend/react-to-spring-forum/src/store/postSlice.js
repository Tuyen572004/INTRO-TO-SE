import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
	name: "postSlice",
	initialState: {
		posts: [],
		hasMore: true,
		page: 1
	},
	reducers: {
		setPosts: (state, action) => {
			state.posts = action.payload;
		},

		addNewPost: (state, action) => {
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

		appendPosts: (state, action) => {
			state.posts = [...state.posts, ...action.payload.posts];
			state.hasMore = action.payload.hasMore;
			state.page = action.payload.nextPage;
		}
	},
});

export const {
	setPosts,
	addNewPost,
	updatePost,
	deletePost,
	appendPosts
} = postSlice.actions;
export const postReducer = postSlice.reducer;
