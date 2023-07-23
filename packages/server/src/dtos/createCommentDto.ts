export type TCreateCommentDto = {
  text: string;
  topicId: number;
  authorId?: number;
  authorName?: string;
  authorAvatar?: string;
  authorYaId?: number;
};
