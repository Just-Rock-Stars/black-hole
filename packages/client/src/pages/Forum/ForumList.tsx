import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { GAME_NAME } from '@constants';

import { IThemeTypes } from './types';

export const ForumList: FC = () => {
  const [theme, setTheme] = useState<IThemeTypes[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/forums').then((res) => setTheme(res.data));
  }, []);

  return (
    <main className="page-container overlay my-6">
      <h1 className="text-4xl py-3 font-black">Сообщество {GAME_NAME}</h1>
      <div className="border-y border-blue-200 py-4">
        <div className="flex text-sm font-bold uppercase py-2 px-2">
          <div className="w-10/12">Название и описание форума</div>
          <div className="w-1/12 text-center">темы</div>
          <div className="w-1/12 text-center">ответы</div>
        </div>
        <div>
          {theme.map(({ name, description, topicsNumber, commentsNumber, id }) => {
            return (
              <div className="odd:bg-white/20 rounded-xl px-2" key={id}>
                <Link to={`/forum/${id}/topics`}>
                  <div className="py-3 flex cursor-pointer">
                    <div className="w-10/12">
                      <div className="text-blue-500 font-black text-2xl hover:underline">
                        {name}
                      </div>
                      <div className="forum-item-discribe h-12">{description}</div>
                    </div>
                    <div className="w-1/12 flex justify-center items-center font-bold">
                      {topicsNumber}
                    </div>
                    <div className="w-1/12 flex justify-center items-center font-bold">
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
