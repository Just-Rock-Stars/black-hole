import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppLinkProps } from './types';

export const AppLink: FC<AppLinkProps> = ({
  className,
  ...props
}: AppLinkProps) => {
  return (
    <Link
      {...props}
      className={clsx(
        'text-blue-600 mt-4 visited:text-blue-600 hover:text-blue-800',
        className
      )}>
      {props.children}
    </Link>
  );
};
