import { Dispatch, SetStateAction } from 'react';

export interface INewTopicProps {
  setIsNewTopicOpen: Dispatch<SetStateAction<boolean>>;
  idTopicList: string | undefined;
}

export interface IMessagesTypes {
  author: string;
  content: string;
  time: string;
  id: string;
}

export interface ITopicTypes {
  topicName: string;
  authorId: number;
  commentsNumber: number;
  lastMessageAuthor: string;
  lastMessageDate: string;
}

export interface IThemeTypes {
  name: string;
  description: string;
  topicsNumber: number;
  commentsNumber: number;
  id: string;
}

export interface ITopicItemProps {
  data: {
    topicName: string;
    commentsNumber: number;
    authorId: number;
    lastMessageAuthor: string;
    lastMessageDate: string;
  };
  idTopicList: string | undefined;
}

export interface IUserData {
  avatar: string;
  display_name: string;
  first_name: string;
}
