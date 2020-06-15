import { createSlice } from "@reduxjs/toolkit";

const inProgressSlice = createSlice({
  name: "inProgress",
  initialState: {
    inProgress: false,
  },
  reducers: {
    start(state, action) {
      console.log("액션스타트");
      state.inProgress = true;
    },
    end(state, action) {
      state.inProgress = false;
    },
  },
});

export const { start, end } = inProgressSlice.actions;

export default inProgressSlice.reducer;
