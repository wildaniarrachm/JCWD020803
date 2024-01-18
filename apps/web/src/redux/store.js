import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { customerSlice } from './customer.slice';
import { authPhoneFirebase } from './auth.phone.firebase';
import { adminSlice } from './admin.slice'


const rootReducer = combineReducers({
  customer: customerSlice.reducer,
  authPhone: authPhoneFirebase.reducer,
  admin: adminSlice.reducer,

});

export const store = configureStore({
  reducer: rootReducer,
});
