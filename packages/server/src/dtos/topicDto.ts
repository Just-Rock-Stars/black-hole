export type TTopicDto = {
  authorId: number;
  topicId: number;
  authorYaId: number;
  topicName: string;
  lastMessageDate?: Date | null;
  commentsNumber: number;
};
