import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { forumApi } from '@api/forumApi';

import { NewTopic } from './components/NewTopic';
import { TopicItem } from './components/TopicItem';
import { ITopicTypes } from './types';

export const TopicList: FC = () => {
  const mock = [
    {
      authorId: 3,
      authorYaId: 9454,
      commentsNumber: 0,
      topicName: 'Ahikyoshi',
      lastMessageAuthor: null,
      lastMessageDate: null,
    },
    {
      authorId: 2,
      authorYaId: 9454,
      commentsNumber: 0,
      topicName: 'Ahikyoshi',
      lastMessageAuthor: null,
      lastMessageDate: null,
    },
    {
      authorId: 4,
      authorYaId: 9454,
      commentsNumber: 0,
      topicName: 'Ahikyoshi',
      lastMessageAuthor: null,
      lastMessageDate: null,
    },
    {
      authorId: 1,
      authorYaId: 9454,
      commentsNumber: 0,
      topicName: 'Ahikyoshi',
      lastMessageAuthor: null,
      lastMessageDate: null,
    },
  ];

  const { idTopicList } = useParams<string>();

  const [topics, setTopics] = useState<ITopicTypes[]>([]);
  const [isNewTopicOpen, setIsNewTopicOpen] = useState<boolean>(false);

  useEffect(() => {
    if (idTopicList != undefined) {
      forumApi
        .getAllTopics(idTopicList)
        .then((topicsList) => setTopics(topicsList.data))
        .catch((e) => console.log(e));
    }
  }, [idTopicList]);

  return (
    <>
      <div className="font-mono overlay page-container my-6">
        <div className="w-full py-2 flex">
          <h1 className="w-10/12 text-3xl">
            Раздел:
            {idTopicList === '1' ? 'Обсуждение игровых моментов' : 'Технические вопросы'}
          </h1>
          <button className="w-2/12 btn-primary" onClick={() => setIsNewTopicOpen(true)}>
            Создать новую тему
          </button>
        </div>
        <nav className="flex text-base px-2 py-2 font-bold uppercase">
          <div className="w-6/12 text-center">тема</div>
          <div className="w-4/12 text-center">ответы</div>
          <div className="w-2/12">последняя публикация</div>
        </nav>
        {topics.map((topicData) => {
          return <TopicItem data={topicData} idTopicList={idTopicList} key={idTopicList} />;
        })}
      </div>
      {isNewTopicOpen && (
        <NewTopic idTopicList={idTopicList} setIsNewTopicOpen={setIsNewTopicOpen} />
      )}
    </>
  );
};
