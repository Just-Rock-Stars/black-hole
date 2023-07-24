import { TReplyDto } from './replyDto';

export type TCommentDto = {
  authorId: number;
  yaId: number;
  authorName: string;
  avatar: string | null;
  text: string;
  replies: TReplyDto[];
};
