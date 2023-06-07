import { FC } from 'react';
import { newTopicProps } from '../types';

export const NewTopic: FC<newTopicProps> = ({ setIsNewTopicOpen }) => {
  return (
    <form className="w-full h-full absolute top-0 left-0 bg-white flex flex-col items-center justify-center">
      <div className=" text-3xl text-center mb-5">Создание нового топика</div>
      <input
        type="text"
        className="w-1/2 h-9 border border-slate-300 rounded indent-1 mb-3"
        placeholder="Опишите вашу проблему"
      />
      <button
        className="w-1/2 h-9 border border-slate-300 rounded hover:bg-slate-300 hover:border-slate-400"
        type="submit">
        Создать
      </button>
      <div
        className=" absolute top-5 right-5 hover:cursor-pointer"
        onClick={() => setIsNewTopicOpen(false)}>
        X
      </div>
    </form>
  );
};
