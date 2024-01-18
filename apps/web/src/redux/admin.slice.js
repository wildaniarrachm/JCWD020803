import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    value: {},
  },
  reducers: {
    setAdminData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAdminData } = adminSlice.actions;
export default adminSlice.reducer;