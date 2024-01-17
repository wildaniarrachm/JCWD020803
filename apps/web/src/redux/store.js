import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { adminSlice } from './admin.slice'

const rootReducer = combineReducers({
  admin: adminSlice.reducer
  
});

export const store = configureStore({
  reducer: rootReducer,
});