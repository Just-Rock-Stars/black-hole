import { Sequelize } from 'sequelize';

import { Comment } from '../Models/Comment';
import { Reply } from '../Models/Reply';
import { User } from '../Models/User';
import { TCreateReplyDto } from '../dtos/createReplyDto';
import { TReplyDto } from '../dtos/replyDto';
import { BadRequest, NotFountError } from '../middlewares/errors';

export interface IRepliesService {
  createReply(dto: TCreateReplyDto): Promise<TReplyDto>;
}

export class RepliesService implements IRepliesService {
  constructor(private _db: Sequelize) {}

  async createReply({
    authorId,
    toCommentId,
    text,
    authorAvatar,
    authorName,
    authorYaId,
  }: TCreateReplyDto): Promise<TReplyDto> {
    let author: User | null = null;

    if (authorId) {
      author = await User.findByPk(authorId);

      if (!author) {
        throw new NotFountError("User doesn't exist");
      }
    }

    const comment = await Comment.findByPk(toCommentId);

    if (!comment) {
      throw new NotFountError('Comment not found');
    }

    const reply = await this._db.transaction(async (t) => {
      if (!author) {
        if (!authorYaId || !authorName) {
          throw new BadRequest('Please provide author id or user name and yandex id');
        }

        author = await User.create(
          {
            Comments: [],
            Name: authorName,
            Replies: [],
            Topics: [],
            YaId: authorYaId,
            Avatar: authorAvatar,
          },
          { transaction: t }
        );
      }

      const creationDate = new Date();

      return Reply.create(
        {
          User: author,
          UserId: author.id,
          Text: text,
          createdAt: creationDate,
          updatedAt: creationDate,
          Comment: comment,
          CommentId: comment.id,
        },
        { transaction: t }
      );
    });

    if (!author) {
      throw new NotFountError("USer doesn't exist");
    }

    return {
      authorId: reply.UserId,
      toCommentId: toCommentId,
      text: reply.Text,
      authorName: author.Name,
      avatar: author.Avatar,
      yaId: author.YaId,
    };
  }
}
