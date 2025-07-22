import { configureStore } from '@reduxjs/toolkit';
import avatarReducer from './slices/avatarSlice';
import leftBarAdminSlice from './slices/leftBarAdminSlice';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
    avatar: avatarReducer,
    leftbar: leftBarAdminSlice,
    auth: authReducer,
    chat: chatReducer,
  },
});

export default store;