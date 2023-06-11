import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
