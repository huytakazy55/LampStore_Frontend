import { configureStore } from '@reduxjs/toolkit';
import avatarReducer from './slices/avatarSlice';
import leftBarAdminSlice from './slices/leftBarAdminSlice';

const store = configureStore({
  reducer: {
    avatar: avatarReducer,
    leftbar: leftBarAdminSlice
  },
});

export default store;