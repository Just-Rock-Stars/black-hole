import { Link } from 'react-router-dom';

import { authActions } from '@store/slices/auth/authSlice';

import { authApi } from '@api/authApi';

import { useAppDispatch } from '@utils/useAppDispatch';
import { useAppSelector } from '@utils/useAppSelector';

import { RoutePaths } from '@src/providers/AppRouter/constants';

import { Avatar } from './Avatar';
import { FormChangeUserData } from './FormChangeUserData';

export const Profile = () => {
  const userInfo = useAppSelector((state) => state.auth.authorizedUser);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    authApi.signOut();
    dispatch(authActions.logout());
  };

  return (
    <div className="relative page-container overlay my-6">
      <div className="flex flex-col justify-center items-center w-full">
        <Avatar avatar={userInfo?.avatar ?? ''} />
        <FormChangeUserData />
        <Link
          className="btn btn-primary text-center w-full max-w-md gap-y-2 mt-3.5"
          to={RoutePaths.CHANGE_PASSWORD}
        >
          Изменить пароль
        </Link>
        <button className="btn btn-danger w-full max-w-md gap-y-2 mt-3.5" onClick={onLogout}>
          Выйти из профиля
        </button>
      </div>
    </div>
  );
};
