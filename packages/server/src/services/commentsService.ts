import { Sequelize } from 'sequelize';

import { Comment } from '../Models/Comment';
import { TCommentDto } from '../dtos/commentDto';
import { TPostCommentDto } from '../dtos/postCommentDto';

export interface ICommentsServices {
  createComment: (dto: TPostCommentDto) => Promise<TCommentDto>;
}

export class CommentsService implements ICommentsServices {
  constructor(private _db: Sequelize) {}
  createComment: ({ authorId, text }: TPostCommentDto) => Promise<TCommentDto> = async (dto) => {
    const newComment = await Comment.create({
      AuthorYaId: authorId,
      Text: text,
      Reactions: [],
      Replies: [],
    });
  };
}
