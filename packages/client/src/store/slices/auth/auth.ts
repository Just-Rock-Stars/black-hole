import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthApi } from '../../../api/Auth/Auth';
import { User, UserSchema } from './types';

const initialState: UserSchema = {
  authData: null,
  isInited: false,
};

const authApi = new AuthApi();

export const getAuthUserInfo = createAsyncThunk('auth/get', async () => {
  try {
    const res = await authApi.GetUserInfo();

    if (!res.data) {
      throw new Error();
    }
    localStorage.setItem('user', JSON.stringify(res.data));

    return res.data;
  } catch (error) {
    return console.error('Вы не авторизованы');
  }
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    initAuthData: state => {
      const user = localStorage.getItem('user');
      if (user) {
        state.authData = JSON.parse(user);
      }
      state.isInited = true;
    },
    logout: state => {
      state.authData = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: builder => {
    builder.addCase(getAuthUserInfo.fulfilled, (state, { payload }) => {
      state.authData = payload;
    });
  },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
