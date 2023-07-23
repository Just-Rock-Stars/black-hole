import { Sequelize } from 'sequelize';

import { Comment } from '../Models/Comment';
import { ForumTopic } from '../Models/ForumTopic';
import { Reply } from '../Models/Reply';
import { User } from '../Models/User';
import { TCommentDto } from '../dtos/commentDto';
import { TCreateCommentDto } from '../dtos/createCommentDto';
import { BadRequest, NotFountError } from '../middlewares/errors';

export interface ICommentsServices {
  createComment: (dto: TCreateCommentDto) => Promise<TCommentDto>;
  getCommentsAndRepliesByTopicId: (id: number) => Promise<TCommentDto[]>;
}

export class CommentsService implements ICommentsServices {
  constructor(private _db: Sequelize) {}
  createComment: (dto: TCreateCommentDto) => Promise<TCommentDto> = async ({
    authorId,
    text,
    topicId,
    authorAvatar,
    authorName,
    authorYaId,
  }) => {
    let author: User | null = null;

    if (authorId) {
      author = await User.findByPk(authorId);

      if (!author) {
        throw new NotFountError("User doesn't exist");
      }
    }

    const topic = await ForumTopic.findByPk(topicId);

    if (topic === null) {
      throw new NotFountError("Topic doesn't exist");
    }
    const comment = await this._db.transaction(async (t) => {
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

      return Comment.create(
        {
          User: author,
          UserId: author.id,
          Text: text,
          Replies: [],
          createdAt: creationDate,
          ForumTopic: topic,
          TopicId: topic.id,
          updatedAt: creationDate,
        },
        { transaction: t }
      );
    });

    if (!author) {
      throw new NotFountError("USer doesn't exist");
    }

    return {
      authorId: comment.UserId,
      text: comment.Text,
      authorName: author.Name,
      avatar: author.Avatar,
      yaId: author.YaId,
      replies: [],
    };
  };

  getCommentsAndRepliesByTopicId: (id: number) => Promise<TCommentDto[]> = async (id) => {
    const topic = await ForumTopic.findByPk(id, {
      include: {
        model: Comment,
        attributes: ['Text'],
        include: [
          { model: User, attributes: ['Name', 'YaId', 'Avatar'] },
          { model: Reply, include: [{ model: User, attributes: ['Name', 'YaId', 'Avatar'] }] },
        ],
      },
    });

    if (!topic) {
      throw new NotFountError("Topic doesn't exist");
    }

    return topic.Comments.map((x) => ({
      authorId: x.UserId,
      text: x.Text,
      authorName: x.User.Name,
      avatar: x.User.Avatar,
      yaId: x.User.YaId,
      replies: x.Replies.map((y) => ({
        authorId: y.UserId,
        yaId: y.User.YaId,
        authorName: y.User.Name,
        avatar: y.User.Avatar ?? null,
        text: y.Text,
        toCommentId: x.id,
      })),
    }));
  };
}
