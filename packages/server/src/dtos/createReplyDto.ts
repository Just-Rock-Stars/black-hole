export type TCreateReplyDto = {
  text: string;
  toCommentId: number;
  authorId?: number;
  authorName?: string;
  authorAvatar?: string;
  authorYaId?: number;
};
