import { memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import { Home } from '../../../pages/Home';
import { Game } from '../../../pages/Game';
import { Forum } from '../../../pages/Forum';
import { Leaderboard } from '../../../pages/Leaderboard';
import { SignIn } from '../../../pages/SignIn/SignIn';
import { SignUp } from '../../../pages/Signup/SignUp';
import { GameStart } from '../../../pages/GameStart';
import { GameEnd } from '../../../pages/GameEnd';
import { AppRouteProps, AppRoutes } from './types';
import { RoutePaths } from './constants';
import { Profile } from '../../../pages/Profile';
import { ChangePassword } from '../../../pages/Profile/ChangePassword';

const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePaths.HOME,
    element: <Home />,
    authOnly: true,
  },
  [AppRoutes.GAME]: {
    path: RoutePaths.GAME,
    element: <Game />,
    authOnly: true,
  },
  [AppRoutes.GAME_START]: {
    path: RoutePaths.GAME_START,
    element: <GameStart />,
    authOnly: true,
  },
  [AppRoutes.GAME_END]: {
    path: RoutePaths.GAME_END,
    element: <GameEnd />,
    authOnly: true,
  },
  [AppRoutes.FORUM]: {
    path: RoutePaths.FORUM,
    element: <Forum />,
    authOnly: true,
  },
  [AppRoutes.LEADERBOARD]: {
    path: RoutePaths.LEADERBOARD,
    element: <Leaderboard />,
    authOnly: true,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePaths.PROFILE,
    element: <Profile />,
    authOnly: true,
  },
  [AppRoutes.CHANGE_PASSWORD]: {
    path: RoutePaths.CHANGE_PASSWORD,
    element: <ChangePassword />,
    authOnly: true,
  },
  [AppRoutes.SIGN_IN]: {
    path: RoutePaths.SIGN_IN,
    element: <SignIn />,
  },
  [AppRoutes.SIGN_UP]: {
    path: RoutePaths.SIGN_UP,
    element: <SignUp />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePaths.NOT_FOUND,
    element: <div>Страница не найдена</div>,
  },
};

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRouteProps) => {
    const element = <>{route.element}</>;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});
