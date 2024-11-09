import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    selectedNotification: notificationReducer,
  },
});

export default store;