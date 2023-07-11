import { TUser } from '@app-types/TUser';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LocalStorageKeys, getLocalStorageItem, setLocalStorageItem } from '@utils/localStorage';

import { IAppServices } from '@src/repository/types';

import { TAuthState } from './types';

const initialState: TAuthState = {
  authorizedUser: null,
  isInitiated: false,
};

export const getAuthUserInfo = createAsyncThunk<TUser>('auth/get', async (arg, thunkApi) => {
  try {
    const { userService }: IAppServices = thunkApi.extra as IAppServices;

    const res = await userService.getCurrentUser();

    if (!res.data) {
      throw new Error();
    }

    setLocalStorageItem(LocalStorageKeys.User, JSON.stringify(res.data));

    return { ...res.data, id: res.data.id };
  } catch (error) {
    console.error('Вы не авторизованы');
    return thunkApi.rejectWithValue(undefined);
  }
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<TUser>) => {
      state.authorizedUser = action.payload;
    },
    initAuthData: (state) => {
      const user = getLocalStorageItem(LocalStorageKeys.User);
      if (user) {
        state.authorizedUser = JSON.parse(user);
      }
      state.isInitiated = true;
    },
    logout: (state) => {
      state.authorizedUser = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthUserInfo.fulfilled, (state, { payload }) => {
      state.authorizedUser = payload;
    });
    builder.addCase(getAuthUserInfo.rejected, (state) => {
      state.authorizedUser = null;
    });
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
