export type TTopicDto = {
  authorId: number;
  topicName: string;
  lastMessageDate?: Date | null;
  commentsNumber: number;
};
