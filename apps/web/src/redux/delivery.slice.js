import { createSlice } from '@reduxjs/toolkit';

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState: {
    value: [],
  },
  reducers: {
    deliveryData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { deliveryData } = deliverySlice.actions;
export default deliverySlice.reducer;
