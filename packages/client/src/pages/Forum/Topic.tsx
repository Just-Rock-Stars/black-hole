import { FC, useState } from 'react';
import { MessagesTypes } from './types';
import { Navbar } from '../../components/Navbar';

export const Topic: FC = () => {
  const testTopic = [
    {
      author: 'BlackWood',
      message: 'Добрый день, не могу поиграть в вашу игру',
      time: '20 минут назад',
      id: 'm0wk9nsf7t',
    },
    {
      author: 'Техническая поддержка',
      message:
        'Добрый день, могли бы вы детальнее описать проблему с которой вы столкнулись?',
      time: '24 минут назад',
      id: '4llr2faznt',
    },
    {
      author: 'BlackWood',
      message: 'Да, я пытаюсь управлять персонажем, но он остаеться на месте.',
      time: '30 минут назад',
      id: '8pihhs0vg8',
    },
    {
      author: 'Техническая поддержка',
      message:
        'Управление персонажем, производится с помощью нажатия на стрелочки.',
      time: '32 минут назад',
      id: 'vnqsvgfmce',
    },
    {
      author: 'BlackWood',
      message: 'Спасибо большое, теперь я могу играть',
      time: '40 минут назад',
      id: 'jzjasy5mfw',
    },
    {
      author: 'Техническая поддержка',
      message: 'В случае возникновения новых проблем обращайтесь!',
      time: '42 минут назад',
      id: '4lyatdbkyi',
    },
  ];

  function goBack() {
    window.history.go(-1);
  }

  const [messages, setMessages] = useState<MessagesTypes>({ data: testTopic });

  return (
    <>
      <Navbar />
      <main className="font-mono" style={{ width: 1280, margin: '50px auto' }}>
        <div className="flex justify-between">
          <div
            className="hover:underline hover:cursor-pointer"
            onClick={() => goBack()}>
            &larr; Обратно к темам
          </div>
          <a href="#comment">
            <button className="p-1 border border-slate-300 rounded hover:bg-slate-300 hover:border-slate-400">
              Написать новое сообщение
            </button>
          </a>
        </div>
        <div className="text-xl py-2 border-b border-black">
          Изначальное сообщение
        </div>
        {messages.data.map(({ message, author, time, id }, index) => {
          return (
            <div className="py-2 px-2 border-b-2 border-black" key={id}>
              <div className="flex justify-between">
                <div className="text-indigo-500">#{index + 1}</div>
                <div className="text-gray-700">{time}</div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center justify-center w-2/12">
                  <img
                    src="https://api.mozambiquehe.re/assets/ranks/gold1.png"
                    alt="User_Avatar"
                    className="h-24"
                  />
                  <div className="text-sm font-bold">{author}</div>
                </div>
                <div className="w-8/12">{message}</div>
              </div>
              <div className="flex justify-end">
                <button className="p-1 border border-slate-300 rounded hover:bg-slate-300 hover:border-slate-400">
                  Ответить
                </button>
              </div>
            </div>
          );
        })}
        <form className="flex flex-col p-2" id="comment">
          <div className="text-2xl mb-2">Добавить сообщение</div>
          <input
            type="text"
            className=" w-1/4 h-9 border border-slate-300 rounded indent-1 mb-3"
            placeholder="Ваш комментарий"
          />
          <button className="w-1/4 h-9 border border-slate-300 rounded hover:bg-slate-300 hover:border-slate-400">
            Отправить
          </button>
        </form>
      </main>
    </>
  );
};
