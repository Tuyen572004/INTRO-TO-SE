import { createSlice} from "@reduxjs/toolkit";

const refreshSlice = createSlice({
    name: "refresh",
    initialState: {
        refresh: false,
    },
    reducers: {
        refresh: (state) => {
            state.refresh = !state.refresh;
        },
    }
});

export const { refresh } = refreshSlice.actions;
export default refreshSlice.reducer;