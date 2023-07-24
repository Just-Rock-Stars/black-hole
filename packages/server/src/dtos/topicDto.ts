export type TTopicDto = {
  authorId: number;
  authorYaId: number;
  topicName: string;
  lastMessageDate?: Date | null;
  commentsNumber: number;
};
