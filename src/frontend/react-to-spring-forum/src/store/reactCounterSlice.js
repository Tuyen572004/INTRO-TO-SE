import { createSlice } from '@reduxjs/toolkit';

const reactCounterSlice = createSlice({
    name: 'counter',
    initialState: {
        reactCounter: {}
    },
    reducers: {
        setCounter: (state, action) => {
            state.reactCounter[action.payload.postId] = action.payload.count;
        },
        increment: (state, action) => {
            state.reactCounter[action.payload]++;
        },
        decrement: (state, action) => {
            state.reactCounter[action.payload]--;
        },
    },
});

export const { setCounter, increment, decrement } = reactCounterSlice.actions;
export const reactCounterReducer = reactCounterSlice.reducer;