import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import contentReducer from './slices/contentSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    content: contentReducer,
  },
});