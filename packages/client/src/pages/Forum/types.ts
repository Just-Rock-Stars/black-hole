import { Dispatch, SetStateAction } from 'react'

export interface TestStateTypes {
  mode: string
}
export interface TopicListProps {
  setTestRoute: Dispatch<SetStateAction<TestStateTypes>>
}
export interface ForumListProps {
  setTestRoute: Dispatch<SetStateAction<TestStateTypes>>
}
