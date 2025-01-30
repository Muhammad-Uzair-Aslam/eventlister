import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice'; 
import eventReducer from './slices/EventSlice';
const store = configureStore({
  reducer: {
    user: authReducer,
    event: eventReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

