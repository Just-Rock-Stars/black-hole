import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: FC = () => {
  return (
    <nav>
      <ul className="flex gap-x-4 border border-black">
        <li>
          <Link className="text-blue-600" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to="/game">
            Game
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to="/liderboard">
            Liderboard
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to="/forum">
            Forum
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to="/sign-in">
            Login
          </Link>
        </li>
        <li>
          <Link className="text-blue-600" to="/sign-up">
            Sign-up
          </Link>
        </li>
      </ul>
    </nav>
  );
};
