import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { MaximizableView } from '@components/MaximizableView';

import { IMessagesTypes } from './types';

export const Topic: FC = () => {
  const [comments, setCommets] = useState([]);
  const [comment, setComment] = useState('');
  useEffect(() => {
    axios.get('http://localhost:3001/api/comments?topicId=34').then((res) => setCommets(res.data));
  }, []);

  useEffect(() => {}, [comments]);

  const sendCommet = () => {
    axios.post('http://localhost:3001/api/comments?topicId=34', {
      text: comment,
      topicId: 34,
      authorName: 'Ahikyoshi',
      authorAvatar: '1212',
      authorYaId: 9454,
    });
  };

  return (
    <div className="font-mono overlay page-container my-6">
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
          {/* {comments.map(({ content, author, time, id }, index) => {
            return (
              <div className="py-2 px-2 border-b-2 border-black" key={id}>
                <div className="flex justify-between">
                  <div className="text-blue-400">#{index + 1}</div>
                  <div>{time}</div>
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
                    onClick={() => setCommets(`@${author}, `)}
                  >
                    Ответить
                  </label>
                </div>
              </div>
            );
          })} */}
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
          <button className="btn-primary w-1/4" onClick={() => sendCommet()} type="submit">
            Отправить
          </button>
        </form>
      </MaximizableView>
    </div>
  );
};
