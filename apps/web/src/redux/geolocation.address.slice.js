import { createSlice } from '@reduxjs/toolkit';

export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState: {
    value: {},
  },
  reducers: {
    setGeolocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setGeolocation } = geolocationSlice.actions;
export default geolocationSlice.reducer;
