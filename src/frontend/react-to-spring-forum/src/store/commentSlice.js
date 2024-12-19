import {createSlice} from '@reduxjs/toolkit';

const commentSlice = createSlice({
    name: 'commentSlice',
    initialState: {
        comments: [],
        reloadReactBar: false,
    },
    reducers: {
        addComment: (state, action) => {
            state.comments.unshift(action.payload);
            state.reloadReactBar = !state.reloadReactBar;
        },
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        updateComment: (state, action) => {
            const index = state.comments.findIndex(comment => comment.id === action.payload.id);
            state.comments[index] = action.payload;
        },
        removeComment: (state, action) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload);
        },
    },
});

export const {
    addComment,
    setComments,
    removeComment,
    updateComment
} = commentSlice.actions;
export const commentReducer = commentSlice.reducer;