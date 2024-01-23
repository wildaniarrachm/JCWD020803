import { createSlice } from '@reduxjs/toolkit';

export const customerAddressSlice = createSlice({
  name: 'customer_address',
  initialState: {
    value: [],
  },
  reducers: {
    addressData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addressData } = customerAddressSlice.actions;
export default customerAddressSlice.reducer;
