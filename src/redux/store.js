import { configureStore } from '@reduxjs/toolkit';
import avatarReducer from './slices/avatarSlice';

const store = configureStore({
  reducer: {
    avatar: avatarReducer,
  },
});

export default store;