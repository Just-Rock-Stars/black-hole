import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TSoundState } from './types';

const initialState: TSoundState = {
  isPlay: true,
};

const soundSlice = createSlice({
  name: 'soundSlice',
  initialState,
  reducers: {
    switchSoundPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
  },
});

export const { actions: soundActions, reducer: soundReducer } = soundSlice;
