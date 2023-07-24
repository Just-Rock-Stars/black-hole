import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { NewTopic } from './components/NewTopic';
import { ITopicTypes } from './types';

export const TopicList: FC = () => {
  const { idTopicList } = useParams();
  const [topics, setTopics] = useState<ITopicTypes[]>([]);
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/forumTopics?forumId=${idTopicList}`)
      .then((res) => setTopics(res.data));
  }, [idTopicList]);

  return (
    <>
      <div className="font-mono overlay page-container my-6">
        <div className="w-full py-2 flex">
          <h1 className="w-10/12 text-3xl">Раздел: (название раздела)</h1>
          <button className="w-2/12 btn-primary" onClick={() => setIsNewTopicOpen(true)}>
            Создать новую тему
          </button>
        </div>
        <nav className="flex text-base px-2 py-2 font-bold uppercase">
          <div className="w-6/12 text-center">тема</div>
          <div className="w-4/12 text-center">ответы</div>
          <div className="w-2/12">последняя публикация</div>
        </nav>
        {topics.map(
          ({ topicName, commentsNumber, authorId, lastMessageAuthor, lastMessageDate }) => {
            return (
              <div className="flex cursor-pointer odd:bg-white/20 rounded-xl px-2" key={authorId}>
                <div className="w-1/12">
                  <img
                    alt="Author_Icon"
                    className="h-24"
                    src="https://api.mozambiquehe.re/assets/ranks/gold1.png"
                  />
                </div>
                <div className="w-5/12">
                  <Link to={`/forum/${idTopicList}/topics/${authorId}`}>
                    <div className="text-lg font-bold hover:underline">{topicName}</div>
                  </Link>
                  <div className="text-xs mt-4 flex ">
                    <div>Автор:</div>
                    <div className="font-bold text-blue-400">{authorId}</div>
                  </div>
                </div>
                <div className="w-4/12 flex items-center justify-center text-2xl font-bold">
                  {commentsNumber}
                </div>
                <div className="w-2/12 flex flex-col justify-center">
                  <div>Новое:</div>
                  <div className="text-blue-400">{lastMessageDate}</div>
                  <div>{lastMessageAuthor}</div>
                </div>
              </div>
            );
          }
        )}
      </div>
      {/* {isNewTopicOpen && (
        <NewTopic setIsNewTopicOpen={setIsNewTopicOpen} idTopicList={idTopicList} />
      )} */}
    </>
  );
};
