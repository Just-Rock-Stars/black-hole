import { Sequelize } from 'sequelize';

import { Comment } from '../Models/Comment';
import { ForumTopic } from '../Models/ForumTopic';
import { TCommentDto } from '../dtos/commentDto';
import { TPostCommentDto } from '../dtos/postCommentDto';
import { NotFountError } from '../middlewares/errors';

export interface ICommentsServices {
  createComment: (dto: TPostCommentDto) => Promise<TCommentDto>;
  getCommentsByTopicId: (id: number) => Promise<TCommentDto[]>;
}

export class CommentsService implements ICommentsServices {
  constructor(private _db: Sequelize) {}
  createComment: (dto: TPostCommentDto) => Promise<TCommentDto> = async ({
    authorId,
    text,
    topicId,
  }) => {
    const comment = await this._db.transaction(async (t) => {
      const topic = await ForumTopic.findByPk(topicId);

      if (topic === null) {
        throw new NotFountError("Topic doesn't exist");
      }

      const creationDate = new Date();

      return Comment.create(
        {
          AuthorYaId: authorId,
          Text: text,
          Reactions: [],
          Replies: [],
          createdAt: creationDate,
          ForumTopic: topic,
          TopicId: topic.id,
          updatedAt: creationDate,
        },
        { transaction: t }
      );
    });

    return { authorId: comment.AuthorYaId, text: comment.Text };
  };

  getCommentsByTopicId: (id: number) => Promise<TCommentDto[]> = async (id) => {
    const topic = await ForumTopic.findByPk(id, {
      include: { model: Comment, attributes: ['Text', 'AuthorYaId'] },
    });

    if (!topic) {
      throw new NotFountError("Topic doesn't exist");
    }

    return topic.Comments.map((x) => ({ authorId: x.AuthorYaId, text: x.Text }));
  };
}
