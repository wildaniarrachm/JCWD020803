import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { customerSlice } from './customer.slice';
import { authPhoneFirebase } from './auth.phone.firebase';

const rootReducer = combineReducers({
  customer: customerSlice.reducer,
  authPhone: authPhoneFirebase.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
