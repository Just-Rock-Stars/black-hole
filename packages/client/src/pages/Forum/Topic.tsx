import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Header } from '@components/Header';
import { MaximizableView } from '@components/MaximizableView';

import { IMessagesTypes } from './types';

export const Topic: FC = () => {
  const testTopic = [
    {
      author: 'BlackWood',
      content: 'Добрый день, не могу поиграть в вашу игру',
      time: '20 минут назад',
      id: 'm0wk9nsf7t',
    },
    {
      author: 'Техническая поддержка',
      content: 'Добрый день, могли бы вы детальнее описать проблему с которой вы столкнулись?',
      time: '24 минут назад',
      id: '4llr2faznt',
    },
    {
      author: 'BlackWood',
      content: 'Да, я пытаюсь управлять персонажем, но он остаеться на месте.',
      time: '30 минут назад',
      id: '8pihhs0vg8',
    },
    {
      author: 'Техническая поддержка',
      content: 'Управление персонажем, производится с помощью нажатия на стрелочки.',
      time: '32 минут назад',
      id: 'vnqsvgfmce',
    },
    {
      author: 'BlackWood',
      content: 'Спасибо большое, теперь я могу играть',
      time: '40 минут назад',
      id: 'jzjasy5mfw',
    },
    {
      author: 'Техническая поддержка',
      content: 'В случае возникновения новых проблем обращайтесь!',
      time: '42 минут назад',
      id: '4lyatdbkyi',
    },
  ];

  const [messages] = useState<IMessagesTypes[]>(testTopic);
  const [comment, setComment] = useState('');

  return (
    <>
      <Header />
      <main className="font-mono" style={{ width: 1280, margin: '50px auto' }}>
        <div className="flex justify-between">
          <Link to={'/forum/2wtqosme50/topics'}>
            <div className="hover:underline hover:cursor-pointer" onClick={window.history.back}>
              &larr; Обратно к темам
            </div>
          </Link>
        </div>
        <MaximizableView backgroundColor="#ffffff">
          <h1 className="text-xl py-2 border-b border-black">Изначальное сообщение</h1>
          <div className="overflow-auto">
            {messages.map(({ content, author, time, id }, index) => {
              return (
                <div className="py-2 px-2 border-b-2 border-black" key={id}>
                  <div className="flex justify-between">
                    <div className="text-indigo-500">#{index + 1}</div>
                    <div className="text-gray-700">{time}</div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center justify-center w-2/12">
                      <img
                        alt="User_Avatar"
                        className="h-24"
                        src="https://api.mozambiquehe.re/assets/ranks/gold1.png"
                      />
                      <div className="text-sm font-bold">{author}</div>
                    </div>
                    <div className="w-8/12">{content}</div>
                  </div>
                  <div className="flex justify-end">
                    <label
                      className="btn-primary"
                      htmlFor="comment"
                      onClick={() => setComment(`@${author}, `)}
                    >
                      Ответить
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          <form className="flex flex-col p-2">
            <div className="text-2xl mb-2">Добавить сообщение</div>
            <textarea
              className=" w-1/2 h-32 border border-slate-300 rounded indent-1 mb-3 resize-none"
              id="comment"
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ваш комментарий"
              value={comment}
            />
            <button className="btn-primary w-1/4" type="submit">
              Отправить
            </button>
          </form>
        </MaximizableView>
      </main>
    </>
  );
};
