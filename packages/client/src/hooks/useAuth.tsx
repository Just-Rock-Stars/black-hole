import { useCallback, useEffect } from 'react';

import { authActions, getAuthUserInfo } from '@store/slices/auth/authSlice';

import { oAuthApi } from '@api/OAuthApi';

import { useAppDispatch } from '@utils/useAppDispatch';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const onSignIn = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      try {
        await oAuthApi.getAccessToken(code);
      } catch (e) {
        console.log(e);
      }
    }

    dispatch(getAuthUserInfo());
    dispatch(authActions.initAuthData());
  }, [dispatch]);

  useEffect(() => {
    onSignIn();
  }, [onSignIn]);
};
