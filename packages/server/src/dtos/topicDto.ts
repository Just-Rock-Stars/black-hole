import { TReactionDto } from './reactionDTO';

export type TTopicDto = {
  authorId: number;
  authorYaId: number;
  topicName: string;
  lastMessageDate?: Date | null;
  commentsNumber: number;
  reactions: TReactionDto[];
};
