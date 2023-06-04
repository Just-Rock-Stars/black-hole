import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../utils/global';

export const Navbar: FC = () => {
  return (
    <nav>
      <ul className="flex xs:flex-col xs:items-center sm:flex-row gap-x-4 border border-black">
        <li>
          <Link className="text-blue-600" to={Routes.INDEX}>
            Home
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to={Routes.GAME}>
            Game
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to={Routes.GAME_START}>
            Start Game
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to={Routes.GAME_END}>
            End Game
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to={Routes.LEADERBOARD}>
            Leaderboard
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to={Routes.FORUM}>
            Forum
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to={Routes.PROFILE}>
            Profile
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to={Routes.SIGNIN}>
            Login
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to={Routes.SIGNUP}>
            Sign-up
          </Link>
        </li>
      </ul>
    </nav>
  );
};
