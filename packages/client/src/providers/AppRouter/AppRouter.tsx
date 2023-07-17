import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ChangePassword } from '@pages/ChangePassword';
import { ForumList } from '@pages/Forum/ForumList';
import { Topic } from '@pages/Forum/Topic';
import { TopicList } from '@pages/Forum/TopicList';
import { Game } from '@pages/Game';
import { GameEnd } from '@pages/GameEnd';
import { GameStart } from '@pages/GameStart';
import { Home } from '@pages/Home';
import { Leaderboard } from '@pages/Leaderboard';
import { NotFoundError } from '@pages/NotFoundError';
import { Profile } from '@pages/Profile';
import { ServerError } from '@pages/ServerError';
import { SignIn } from '@pages/SignIn';
import { SignUp } from '@pages/SignUp';

import { Header } from '@components/Header';

import { RequireAuth } from './RequireAuth';
import { RoutePaths } from './constants';
import { AppRoutes, TAppRouteProps } from './types';

const routeConfig: Record<AppRoutes, TAppRouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePaths.HOME,
    element: <Home />,
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
    element: <ForumList />,
    authOnly: true,
  },
  [AppRoutes.TOPIC_LIST]: {
    path: RoutePaths.TOPIC_LIST,
    element: <TopicList />,
    authOnly: true,
  },
  [AppRoutes.TOPIC]: {
    path: RoutePaths.TOPIC,
    element: <Topic />,
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
    element: <NotFoundError />,
  },
  [AppRoutes.SERVER_ERROR]: {
    path: RoutePaths.SERVER_ERROR,
    element: <ServerError />,
  },
};

const renderWithWrapper = (route: TAppRouteProps) => {
  const element = (
    <>
      <Header />
      <main className="mt-20 overflow-y-scroll">{route.element}</main>
    </>
  );

  return (
    <Route
      element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
      key={route.path}
      path={route.path}
    />
  );
};

export const AppRouter: FC = () => {
  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};
