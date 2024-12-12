import { createSlice } from '@reduxjs/toolkit';

const reactCounterSlice = createSlice({
    name: 'reactCounter',
    initialState: {
        reactCounter: {},
        reactedPosts: {},
    },
    reducers: {
        setReactCounter: (state, action) => {
            const { postId, count } = action.payload;
            state.reactCounter[postId] = count;
        },
        increment: (state, action) => {
            const postId = action.payload;
            state.reactCounter[postId] = (state.reactCounter[postId] || 0) + 1;
            state.reactedPosts[postId] = true;
        },
        decrement: (state, action) => {
            const postId = action.payload;
            state.reactCounter[postId] = Math.max((state.reactCounter[postId] || 0) - 1, 0);
            state.reactedPosts[postId] = false;
        },
        addReactStatus: (state, action) => {
            const { postId, isReacted } = action.payload;
            state.reactedPosts[postId] = isReacted;
        },
        updateReactStatus: (state, action) => {
            const { postId, isReacted } = action.payload;
            state.reactedPosts[postId] = isReacted;
        }
    }
});

export const {
    setReactCounter,
    increment,
    decrement,
    addReactStatus,
    updateReactStatus
} = reactCounterSlice.actions;

export const reactCounterReducer = reactCounterSlice.reducer;