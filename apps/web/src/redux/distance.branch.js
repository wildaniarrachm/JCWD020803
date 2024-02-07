import { createSlice } from '@reduxjs/toolkit';

export const distanceSlice = createSlice({
  name: 'distance',
  initialState: {
    value: [],
  },
  reducers: {
    distanceData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { distanceData } = distanceSlice.actions;
export default distanceSlice.reducer;
