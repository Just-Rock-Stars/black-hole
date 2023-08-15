import { FC, useState } from 'react';

import { forumApi } from '@api/forumApi';

import { INewTopicProps } from '../../types';

export const NewTopic: FC<INewTopicProps> = ({ setIsNewTopicOpen, idTopicList }) => {
  const [inputValue, setInputValue] = useState('');

  const publicNewTopic = () => {
    const userData = localStorage.getItem('user');

    if (!userData) return;

    const user = JSON.parse(userData);

    const responseData = {
      forumId: idTopicList,
      name: inputValue,
      yaId: user.id,
      authorName: user.display_name ?? user.first_name,
    };

    forumApi
      .createNewTopic(responseData)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));

    setIsNewTopicOpen(false);
  };

  return (
    <div className="w-full h-screen bg-black/10 flex flex-col items-center justify-center absolute top-0 left-0 overlay">
      <div className="mb-5 text-3xl text-center">Создание нового топика</div>

      <input
        className="w-full h-11 mb-3 indent-1 border border-slate-300 rounded md:w-80 text-black"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Опишите вашу проблему"
        type="text"
        value={inputValue}
      />
      <button className="w-full h-11 btn-primary md:w-80" onClick={() => publicNewTopic()}>
        Создать
      </button>
      <div
        className=" absolute top-5 right-5 hover:cursor-pointer"
        onClick={() => setIsNewTopicOpen(false)}
      >
        X
      </div>
    </div>
  );
};
