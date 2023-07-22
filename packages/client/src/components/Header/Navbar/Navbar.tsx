import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { navigationItems } from '@components/Header/navigationItems';

import { useAppSelector } from '@utils/useAppSelector';

import { TNavbarProps } from './types';

export const Navbar: FC<TNavbarProps> = ({ orientation }) => {
  const authorizedUser = useAppSelector((state) => state.auth.authorizedUser);

  const _navigationItems = authorizedUser
    ? navigationItems.forAuthenticatedUsers
    : navigationItems.forNotAuthenticatedUsers;

  return (
    <nav className="flex items-center">
      <ul
        className={clsx(
          'items-center gap-2 justify-end w-full gap-x-4',
          orientation === 'vertical' && 'flex flex-col',
          orientation === 'horizontal' && 'hidden sm:flex'
        )}
      >
        {_navigationItems.map((navigationItem) => (
          <li key={navigationItem.url}>
            <Link
              className="text-black hover:text-blue-500 dark:text-white dark:hover:text-blue-300"
              to={navigationItem.url}
            >
              {navigationItem.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
