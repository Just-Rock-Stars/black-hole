import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
  HOME = 'HOME',
  GAME = 'GAME',
  GAME_START = 'GAME_START',
  GAME_END = 'GAME_END',
  FORUM = 'FORUM',
  TOPIC_LIST = 'TOPIC_LIST',
  TOPIC = 'TOPIC',
  LEADERBOARD = 'LEADERBOARD',
  PROFILE = 'PROFILE',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  NOT_FOUND = 'NOT_FOUND',
}

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
};

export interface RequireAuthProps {
  children: JSX.Element;
}
