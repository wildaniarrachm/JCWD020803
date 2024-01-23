import { createSlice } from '@reduxjs/toolkit';

export const provincesSlice = createSlice({
  name: 'provinces',
  initialState: {
    value: [],
  },
  reducers: {
    setProvinces: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProvinces } = provincesSlice.actions;
export default provincesSlice.reducer;
