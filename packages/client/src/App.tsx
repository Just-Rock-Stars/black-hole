import clsx from 'clsx';
import { FC, useEffect } from 'react';

import { authActions, getAuthUserInfo } from '@store/slices/auth/authSlice';

import { Background } from '@components/Background';
import { NoInternetConnectionNotification } from '@components/NoInternetConnectionNotification';

import { useIsOnline } from '@utils/isOnline';
import { useAppDispatch } from '@utils/useAppDispatch';

import { useAuth } from '@src/hooks/useAuth';
import { useTheme } from '@src/hooks/useTheme';

import { AppRouter } from './providers/AppRouter';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  const { isOnline } = useIsOnline();
  useAuth();
  useTheme();

  useEffect(() => {
    dispatch(getAuthUserInfo());
    dispatch(authActions.initAuthData());
  }, [dispatch]);

  return (
    <>
      <NoInternetConnectionNotification />
      <div className={clsx({ grayscale: !isOnline })}>
        <Background />
        <div className="relative z-1">
          <AppRouter />
        </div>
      </div>
    </>
  );
};
