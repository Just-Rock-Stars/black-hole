import { Dispatch, SetStateAction } from 'react';

export interface newTopicProps {
  setIsNewTopicOpen: Dispatch<SetStateAction<boolean>>;
}

export interface MessagesTypes {
  data: {
    author: string;
    message: string;
    time: string;
    id: string;
  }[];
}

export interface TopicTypes {
  data: {
    title: string;
    author: string;
    answers: number;
    lastPublic: { time: string; author: string };
    id: string;
  }[];
}

export interface ThemeTypes {
  data: {
    title: string;
    discribe: string;
    countOfThemes: number;
    countOfAnswers: number;
    id: string;
  }[];
}
