import { createSlice } from '@reduxjs/toolkit';

export const authPhoneFirebase = createSlice({
  name: 'authPhone',
  initialState: {
    value: [],
  },
  reducers: {
    authPhone: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { authPhone } = authPhoneFirebase.actions;
export default authPhoneFirebase.reducer;
