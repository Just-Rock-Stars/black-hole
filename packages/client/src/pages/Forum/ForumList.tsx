import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { GAME_NAME } from '@constants';

import { IThemeTypes } from './types';

export const ForumList: FC = () => {
  const testList = [
    {
      title: 'Обсуждение игровых моментов',
      description:
        'Зарегистрируйтесь на форуме сообщества Apex Legends для обсуждения информации об игре, кодов предзаказа, обновлений и списков изменений.',
      countOfTopics: 2358,
      countOfAnswers: 18649,
      id: '2wtqosme50',
    },
    {
      title: 'Технические вопросы',
      description:
        'Проблема с активацией кода или подключением? Низкая производительность? Сбой, зависание или ошибка? Ищите решения проблем в нашем сообществе.',
      countOfTopics: 8114,
      countOfAnswers: 34412,
      id: 'uv2da0x5fz',
    },
    {
      title: 'Сообщения об ошибках',
      description: 'Рассказывайте об ошибках, чтобы получить помощь сообщества.',
      countOfTopics: 2341,
      countOfAnswers: 7808,
      id: '95pkt1q2iy',
    },
  ];

  const [theme] = useState<IThemeTypes[]>(testList);

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
          {theme.map(({ title, description, countOfTopics, countOfAnswers, id }) => {
            return (
              <div className="odd:bg-white/20 rounded-xl px-2" key={id}>
                <Link to={`/forum/${id}/topics`}>
                  <div className="py-3 flex cursor-pointer">
                    <div className="w-10/12">
                      <div className="text-blue-500 font-black text-2xl hover:underline">
                        {title}
                      </div>
                      <div className="forum-item-discribe h-12">{description}</div>
                    </div>
                    <div className="w-1/12 flex justify-center items-center font-bold">
                      {countOfTopics}
                    </div>
                    <div className="w-1/12 flex justify-center items-center font-bold">
                      {countOfAnswers}
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
