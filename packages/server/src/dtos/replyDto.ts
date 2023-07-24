export type TReplyDto = {
  authorId: number;
  yaId: number;
  authorName: string;
  avatar: string | null;
  text: string;
  toCommentId: number;
};
