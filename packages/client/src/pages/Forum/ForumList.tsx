import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { forumApi } from '@api/forumApi';

import { GAME_NAME } from '@constants';

import { IThemeTypes } from './types';

export const ForumList: FC = () => {
  const [theme, setTheme] = useState<IThemeTypes[]>([]);

  useEffect(() => {
    forumApi
      .getAllForums()
      .then((forumsList) => setTheme(forumsList.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <main className="my-6 page-container overlay">
      <h1 className="py-3 text-xl font-black md:text-4xl">Сообщество {GAME_NAME}</h1>

      <div className="py-4 border-y border-blue-200">
        <div className="mb-4 text-xs font-bold uppercase flex md:text-base">
          <div className="w-6/12">Название и описание форума</div>
          <div className="w-3/12 text-center">темы</div>
          <div className="w-3/12 text-center">ответы</div>
        </div>

        <div>
          {theme.map(({ name, description, topicsNumber, commentsNumber, id }) => {
            return (
              <div className="px-1 rounded-sm odd:bg-white/20" key={id}>
                <Link to={`/forum/${id}/topics`}>
                  <div className="py-2 flex cursor-pointer">
                    <div className="w-6/12">
                      <div className="text-blue-500 text-sm font-black hover:underline md:text-2xl">
                        {name}
                      </div>
                      <div className="text-sm hidden md:block">{description}</div>
                    </div>
                    <div className="w-3/12 font-bold flex justify-center items-center">
                      {topicsNumber}
                    </div>
                    <div className="w-3/12 font-bold flex justify-center items-center">
                      {commentsNumber}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
