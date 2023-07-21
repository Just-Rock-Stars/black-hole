export type TTopicDto = {
  authorId: number;
  topicName: string;
  lastMessageDate?: Date | null;
  lastMessageAuthor?: number | null;
  commentsNumber: number;
};
