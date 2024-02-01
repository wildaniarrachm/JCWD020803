import { createSlice } from '@reduxjs/toolkit';

export const positionSlice = createSlice({
  name: 'position',
  initialState: {
    value: [],
  },
  reducers: {
    positionData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { positionData } = positionSlice.actions;
export default positionSlice.reducer;
