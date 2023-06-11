import { FC } from 'react';
import { Link } from 'react-router-dom';
import { NavbarProps } from './types';
import { RoutePaths } from '../../providers/Router/AppRouter/constants';

const Navbar: FC<NavbarProps> = ({ isVertical = false }) => {
  return (
    <nav>
      <ul
        className={`${isVertical ? 'flex-col' : ''} 
        ${isVertical ? 'flex' : 'hidden sm:flex'}
        items-center gap-2 justify-end w-full gap-x-4`}>
        <li>
          <Link
            className="text-blue-600 hover:text-blue-400"
            to={RoutePaths.HOME}>
            Home
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 hover:text-blue-400"
            to={RoutePaths.GAME}>
            Game
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 hover:text-blue-400"
            to={RoutePaths.GAME_START}>
            Start Game
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 hover:text-blue-400"
            to={RoutePaths.GAME_END}>
            End Game
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 hover:text-blue-400"
            to={RoutePaths.LEADERBOARD}>
            Leaderboard
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 hover:text-blue-400"
            to={RoutePaths.FORUM}>
            Forum
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 hover:text-blue-400"
            to={RoutePaths.PROFILE}>
            Profile
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 hover:text-blue-400"
            to={RoutePaths.SIGN_IN}>
            Login
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-600 hover:text-blue-400"
            to={RoutePaths.SIGN_UP}>
            Sign-up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
