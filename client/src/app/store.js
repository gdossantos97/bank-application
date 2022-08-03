import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import transferReducer from '../features/transfers/transferSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transfers: transferReducer,
  },
})
