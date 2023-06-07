import { FC } from 'react';
import { Navbar } from '../../components/Navbar';
import { useState } from 'react';
import { ForumList } from './components/ForumList';
import { TopicList } from './components/TopicList';
import { Topic } from './components/Topic';
import { TestStateTypes } from './types';

const Forum: FC = () => {
  const [testRoute, setTestRoute] = useState<TestStateTypes>({ mode: 'main' });

  return (
    <>
      <Navbar />
      {testRoute.mode === 'main' && <ForumList setTestRoute={setTestRoute} />}
      {testRoute.mode === 'theme' && <TopicList setTestRoute={setTestRoute} />}
      {testRoute.mode === 'topic' && <Topic />}
    </>
  );
};

export default Forum;
