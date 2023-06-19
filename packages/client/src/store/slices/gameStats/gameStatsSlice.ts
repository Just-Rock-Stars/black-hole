import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TGameState, TSetGameStatsPayload } from './types';

const initialState: TGameState = {
  consumedEnemies: null,
  maxSize: null,
  gameDuration: null,
  points: null,
};

export const gameStatsSlice = createSlice({
  name: 'gameStateSlice',
  initialState,
  reducers: {
    setGameStats: (
      state,
      {
        payload: { consumedEnemies, maxPoints: maxSize, gameDuration: playTime, points },
      }: PayloadAction<TSetGameStatsPayload>
    ) => {
      state.consumedEnemies = consumedEnemies;
      state.maxSize = maxSize;
      state.gameDuration = playTime;
      state.points = points;
    },
  },
});
