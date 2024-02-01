import { adminSlice } from './admin.slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { customerSlice } from './customer.slice';
import { authPhoneFirebase } from './auth.phone.firebase';
import { customerAddressSlice } from './customer.address.slice';
import { geolocationSlice } from './geolocation.address.slice';
import { provincesSlice } from './province.slice';
import { positionSlice } from './position.slice';
import { deliverySlice } from './delivery.slice';
import { distanceSlice } from './distance.branch';

const rootReducer = combineReducers({
  customer: customerSlice.reducer,
  authPhone: authPhoneFirebase.reducer,
  customerAddress: customerAddressSlice.reducer,
  geolocation: geolocationSlice.reducer,
  provinces: provincesSlice.reducer,
  admin: adminSlice.reducer,
  position: positionSlice.reducer,
  delivery: deliverySlice.reducer,
  distance: distanceSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
