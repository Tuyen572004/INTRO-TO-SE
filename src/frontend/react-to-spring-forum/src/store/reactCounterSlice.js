import { createSlice } from '@reduxjs/toolkit';

const reactCounterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 0,
    },
    reducers: {
        setCounter: (state, action) => {
            state.counter = action.payload;
        },
        increment: (state) => {
            state.counter += 1;
        },
        decrement: (state) => {
            state.counter -= 1;
        },
    },
});

export const {setCounter, increment, decrement } = reactCounterSlice.actions;
export const counterReducer = reactCounterSlice.reducer;