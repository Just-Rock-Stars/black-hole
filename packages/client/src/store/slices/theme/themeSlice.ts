import { createAction, createSlice } from '@reduxjs/toolkit';

import { Theme } from '../../../constants';
import { IThemeState } from './types';

const initialState: IThemeState = {
  colorScheme: Theme.DARK,
};

const toggleTheme = createAction('themeSlice/toggleTheme', (theme: Theme) => {
  localStorage.setItem('theme', theme);

  return { payload: theme };
});

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleTheme, (state, { payload }) => {
      state.colorScheme = payload;
    });
  },
});

export const themeActions = { toggleTheme };
export const themeReducer = themeSlice.reducer;
