import { FC, useState } from 'react';
import { TopicListProps, TopicTypes } from '../types';

export const TopicList: FC<TopicListProps> = props => {
  const testTopicList = [
    {
      title: 'Некоректное начисление бонусов за матч',
      author: 'FlexK1ngN1TTV',
      answers: 1,
      lastPublic: {
        time: '4 часа назад',
        author: 'Техническая поддержка',
      },
      id: '8bxnesczx4',
    },
    {
      title: 'Баг в меню, не работает кнопка играть',
      author: 'Falepton',
      answers: 5,
      lastPublic: {
        time: '5 часа назад',
        author: 'Техническая поддержка',
      },
      id: 'ie9q2fkvu8',
    },
    {
      title: 'Как пройти финальный уровень?',
      author: 'Dalsem',
      answers: 2,
      lastPublic: {
        time: '10 часов назад',
        author: 'Пользователь: Falepton',
      },
      id: 'afwnh0lmjv',
    },
    {
      title: 'Персонаж телепортируется во время игры',
      author: 'Copatich',
      answers: 0,
      lastPublic: {
        time: '1 день назад',
        author: '',
      },
      id: 'e7orkus6qo',
    },
    {
      title: 'Люблю вашу игру',
      author: 'Piligrim',
      answers: 1,
      lastPublic: {
        time: '2 дня назад',
        author: 'Техническая поддержка',
      },
      id: '43so7tojfk',
    },
  ];

  const [topic, setTopic] = useState<TopicTypes>({ data: testTopicList });

  return (
    <main className="font-mono" style={{ width: 1280, margin: '50px auto' }}>
      <h1 className="w-full py-2 text-3xl text-slate-800 border-y border-black">
        Раздел: (название раздела)
      </h1>
      <nav className="flex text-xl">
        <div className="w-6/12">тема</div>
        <div className="w-2/12 text-center">ответы</div>
        <div className="w-4/12 text-center">последняя публикация</div>
      </nav>

      {topic.data.map(({ title, answers, author, lastPublic, id }) => {
        return (
          <div
            className="flex py-1 px-1 cursor-pointer odd:bg-slate-200"
            onClick={() => props.setTestRoute({ mode: 'topic' })}
            key={id}>
            <div className="w-6/12">
              <div className="text-lg h-20 mt-1">{title}</div>
              <div className="text-sm">Автор: {author}</div>
            </div>
            <div className="w-2/12 flex items-center justify-center text-2xl">
              {answers}
            </div>
            <div className="w-4/12 flex flex-col items-center justify-center">
              <div className="">{lastPublic.time}</div>
              <div className="">{lastPublic.author}</div>
            </div>
          </div>
        );
      })}
    </main>
  );
};
