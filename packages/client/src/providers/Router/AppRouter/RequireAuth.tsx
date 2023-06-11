import { Navigate, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { RoutePaths } from './constants';
import { RequireAuthProps } from './types';

export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const auth = useAppSelector(state => state.auth.authData);

  const location = useLocation();

  if (!auth) {
    return (
      <Navigate to={RoutePaths.SIGN_IN} state={{ from: location }} replace />
    );
  }

  return children;
};
