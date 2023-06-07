import { FC, useState } from 'react';
import { MessagesTypes } from '../types';

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

  const [messages, setMessages] = useState<MessagesTypes>({ data: testTopic });

  return (
    <main className="font-mono" style={{ width: 1280, margin: '50px auto' }}>
      <h1 className="w-full py-2 text-3xl text-slate-800 border-y border-black">
        {testTopic[0].message}
      </h1>
      {messages!.data.map(({ message, author, time, id }) => {
        return (
          <div
            className="flex py-10 px-1 cursor-pointer odd:bg-slate-200"
            key={id}>
            <div className="text-sm w-2/12">{author}</div>
            <div className="w-8/12">{message}</div>
            <div className="w-2/12 text-end">{time}</div>
          </div>
        );
      })}
    </main>
  );
};
