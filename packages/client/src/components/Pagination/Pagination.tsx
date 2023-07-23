import clsx from 'clsx';
import { FC } from 'react';

import { IPagination } from './types';

export const Pagination: FC<IPagination> = ({ pages, switchPages, currentPage }) => {
  return (
    <div className="flex flex-col mt-2">
      <h1>Страницы:</h1>
      <ul className="flex mt-1">
        {pages.map((page) => {
          return (
            <li
              className={clsx(
                page === currentPage
                  ? 'p-2 mr-1 bg-white/50 rounded-sm'
                  : 'p-2 mr-1 cursor-pointer rounded-sm hover:bg-white/30'
              )}
              key={page}
              onClick={() => switchPages(page)}
            >
              {page + 1}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
