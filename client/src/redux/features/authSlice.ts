import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1;
      }
    }
})

export const { increment } = authSlice.actions;

export default authSlice.reducer;