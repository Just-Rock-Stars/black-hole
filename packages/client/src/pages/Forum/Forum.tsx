// Core
import { FC } from 'react'
import { Navbar } from '../../components/Navbar'
// Components
import { useState } from 'react'
import { ForumList } from './Components/ForumList'
import { TopicList } from './Components/TopicList'
import { Topic } from './Components/Topic'
// Types
import { TestStateTypes } from './types'

const Forum: FC = () => {
  const [testRoute, setTestRoute] = useState<TestStateTypes>({ mode: 'main' })

  return (
    <>
      <Navbar />
      {testRoute.mode === 'main' && <ForumList setTestRoute={setTestRoute} />}
      {testRoute.mode === 'theme' && <TopicList setTestRoute={setTestRoute} />}
      {testRoute.mode === 'topic' && <Topic />}
    </>
  )
}

export default Forum
