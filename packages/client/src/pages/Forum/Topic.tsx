import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { forumApi } from '@api/forumApi';

import { MaximizableView } from '@components/MaximizableView';

import { CommentInTopic } from './components/Comment';

export const Topic: FC = () => {
  const [comments, setCommets] = useState([]);
  const [comment, setComment] = useState('');

  const [didUpdate, setDidUpdate] = useState(false);

  const params = useParams();

  useEffect(() => {
    if (params.idTopic != undefined) {
      forumApi.getTopicComments(params.idTopic).then((res) => {
        setCommets(res.data);
        setDidUpdate((prev) => {
          return !prev;
        });
      });
    }
  }, [didUpdate, params.idTopic]);

  const sendCommet = () => {
    const userData = localStorage.getItem('user');

    if (!userData) return;

    const user = JSON.parse(userData);

    if (!params.idTopic) return;

    forumApi.sendCommet(params.idTopic, {
      text: comment,
      topicId: Number(params.idTopic),
      authorName: user.dispay_name,
      authorAvatar: user.avatar,
      authorYaId: user.id,
    });

    setDidUpdate((prev) => {
      return !prev;
    });
  };

  return (
    <div className="font-mono overlay page-container my-6">
      <div className="flex justify-between">
        <Link to={'/forum'}>
          <div className="hover:underline hover:cursor-pointer" onClick={window.history.back}>
            &larr; Обратно к темам
          </div>
        </Link>
      </div>
      <MaximizableView backgroundColor="#ffffff">
        <h1 className="text-xl py-2 border-b border-black">Изначальное сообщение</h1>
        <div className="overflow-auto">
          {comments.map((comment, index) => {
            return <CommentInTopic comment={comment} index={index} key={index} />;
          })}
        </div>
        <div className="flex flex-col p-2">
          <div className="text-2xl mb-2">Добавить сообщение</div>
          <textarea
            className="text-black w-1/2 h-32 border border-slate-300 rounded indent-1 mb-3 resize-none"
            id="comment"
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ваш комментарий"
            value={comment}
          />
          <button className="btn-primary w-1/4" onClick={() => sendCommet()} type="button">
            Отправить
          </button>
        </div>
      </MaximizableView>
    </div>
  );
};
