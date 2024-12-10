import { createSlice } from "@reduxjs/toolkit";

const myPostSlice = createSlice({
    name: "myPostSlice",
    initialState: {
        myPosts: [],
    },
    reducers: {
        setMyPosts: (state, action) => {
            state.myPosts = action.payload;
        },

        addMyPost: (state, action) => {
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
    },
});

export const { setMyPosts, addMyPost, updateMyPost, deleteMyPost } = myPostSlice.actions;
export const myPostReducer = myPostSlice.reducer;
