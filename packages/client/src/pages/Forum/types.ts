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

export interface MessagesTypes {
  data: { author: string; message: string; time: string }[]
}

export interface TopicTypes {
  data: {
    title: string
    author: string
    answers: number
    lastPublic: { time: string; author: string }
  }[]
}

export interface ThemeTypes {
  data: {
    title: string
    discribe: string
    countOfThemes: number
    countOfAnswers: number
  }[]
}
