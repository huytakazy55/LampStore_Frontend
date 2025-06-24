import { configureStore } from '@reduxjs/toolkit';
import avatarReducer from './slices/avatarSlice';
import leftBarAdminSlice from './slices/leftBarAdminSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    avatar: avatarReducer,
    leftbar: leftBarAdminSlice,
    auth: authReducer,
  },
});

export default store;