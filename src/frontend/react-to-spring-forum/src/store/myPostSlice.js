import { createSlice } from "@reduxjs/toolkit";

const myPostSlice = createSlice({
    name: "myPostSlice",
    initialState: {
        myPosts: [],
        hasMore: true,
        page: 1
    },
    reducers: {
        setMyPosts: (state, action) => {
            state.myPosts = action.payload;
        },

        addNewPost: (state, action) => {
            state.myPosts.unshift(action.payload);
        },

        updateMyPost: (state, action) => {
            const updatedPost = action.payload;
            state.myPosts = state.myPosts.map((post) =>
                post.id === updatedPost.id ? updatedPost : post
            );
        },

        deleteMyPost: (state, action) => {
            state.myPosts = state.myPosts.filter((post) => post.id !== action.payload);
        },

        appendMyPosts: (state, action) => {
            state.myPosts = [...state.myPosts, ...action.payload.posts];
            state.hasMore = action.payload.hasMore;
            state.page = action.payload.nextPage;
        }
    },
});

export const {
    setMyPosts,
    addNewPost,
    updateMyPost,
    deleteMyPost,
    appendMyPosts
} = myPostSlice.actions;
export const myPostReducer = myPostSlice.reducer;
