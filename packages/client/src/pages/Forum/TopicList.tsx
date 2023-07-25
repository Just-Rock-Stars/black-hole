import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { forumApi } from '@api/forumApi';

import { NewTopic } from './components/NewTopic';
import { TopicItem } from './components/TopicItem';
import { ITopicTypes } from './types';

export const TopicList: FC = () => {
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
      <div className="my-6 font-black overlay page-container">
        <div className="w-full py-3 flex justify-between items-center">
          <h1 className="w-8/12 text-2xl md:text-4xl">
            Раздел
            <div className="mt-2 font-normal text-sm md:text-xl md:mt-1">
              {idTopicList === '1' ? 'Обсуждение игровых моментов' : 'Технические вопросы'}
            </div>
          </h1>

          <button
            className="w-4/12 h-9 bg-blue-500 font-thin text-sm rounded-sm md:max-w-max md:px-2"
            onClick={() => setIsNewTopicOpen(true)}
          >
            Задать вопрос
          </button>
        </div>

        <nav className="py-2 text-xs uppercase flex items-center md:text-base">
          <div className="w-4/12 text-center">тема</div>
          <div className="w-4/12 text-center">ответы</div>
          <div className="w-4/12">последняя публикация</div>
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
