import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TGameState, TSetGameStatsPayload } from './types';

const initialState: TGameState = {
  consumedEnemies: null,
  maxSize: null,
  playTime: null,
  points: null,
};

export const gameStatsSlice = createSlice({
  name: 'gameStateSlice',
  initialState,
  reducers: {
    setGameStats: (
      state,
      {
        payload: { consumedEnemies, maxSize, playTime, points },
      }: PayloadAction<TSetGameStatsPayload>
    ) => {
      state.consumedEnemies = consumedEnemies;
      (state.maxSize = maxSize), (state.playTime = playTime), (state.points = points);
    },
  },
});
