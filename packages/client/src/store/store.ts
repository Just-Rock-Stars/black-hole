import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { IAppServices } from '@src/repository/types';

import { authReducer } from './slices/auth/authSlice';
import { TAuthState } from './slices/auth/types';
import { gameStatsSlice } from './slices/gameStats/gameStatsSlice';
import { TGameState } from './slices/gameStats/types';
import { soundReducer } from './slices/sound/soundSlice';
import { themeReducer } from './slices/theme/themeSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  sound: soundReducer,
  theme: themeReducer,
  gameStats: gameStatsSlice.reducer,
});

export type TStoreState = {
  auth: TAuthState;
  gameStats: TGameState;
};

export const createStore = (services: IAppServices, initialState?: TStoreState) =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    preloadedState: initialState,
    middleware: (getDefaultMiddleWare) => {
      return getDefaultMiddleWare({ thunk: { extraArgument: services } });
    },
  });

export type TRootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type TAppDispatch = ReturnType<typeof createStore>['dispatch'];
