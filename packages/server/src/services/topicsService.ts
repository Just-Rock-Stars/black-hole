import { Sequelize } from 'sequelize';

import { Comment } from '../Models/Comment';
import { Forum } from '../Models/Forum';
import { ForumTopic } from '../Models/ForumTopic';
import { Reply } from '../Models/Reply';
import { User } from '../Models/User';
import { TCreateTopicDto } from '../dtos/createTopicDto';
import { TTopicDto } from '../dtos/topicDto';
import { NotFountError } from '../middlewares/errors';

export interface ITopicService {
  createTopic(dto: TCreateTopicDto): Promise<TTopicDto>;

  getAllTopicsByForumId(id: number): Promise<TTopicDto[]>;
}

export class TopicService implements ITopicService {
  constructor(private _db: Sequelize) {}

  async createTopic({
    authorId,
    forumId,
    name,
    authorName,
    avatar,
    yaId,
  }: TCreateTopicDto): Promise<TTopicDto> {
    const forum = await Forum.findByPk(forumId);

    if (!forum) {
      throw new NotFountError("Forum doesn't exist");
    }

    const [newTopic, createdYaId] = await this._db.transaction(async (t) => {
      let existingAuthor: User | null = null;

      if (authorId) {
        const author = await User.findByPk(authorId);

        if (!author) {
          throw new NotFountError("User doesn't exist");
        }

        existingAuthor = author;
      }

      if (yaId && !existingAuthor) {
        existingAuthor = await User.findOne({ where: { YaId: yaId } });
      }

      if (authorName && !existingAuthor) {
        console.log;
        existingAuthor = await User.create(
          {
            Avatar: avatar ?? null,
            Comments: [],
            Name: authorName,
            Replies: [],
            Topics: [],
            YaId: yaId,
          },
          { transaction: t }
        );
      }

      if (!existingAuthor) {
        throw new NotFountError("Author doesn't exist");
      }

      const topic = await ForumTopic.create(
        {
          User: existingAuthor,
          UserId: existingAuthor.id,
          Comments: [],
          Forum: forum,
          ForumId: forum.id,
          TopicName: name,
        },
        { transaction: t }
      );

      await existingAuthor.update('Topics', [topic], { transaction: t });
      return [topic, existingAuthor.YaId];
    });

    return {
      authorId: newTopic.UserId,
      commentsNumber: 0,
      topicName: newTopic.TopicName,
      authorYaId: createdYaId,
    };
  }

  async getAllTopicsByForumId(id: number): Promise<TTopicDto[]> {
    const topics = await ForumTopic.findAll({
      where: { ForumId: id },
      include: [
        {
          model: Comment,
          attributes: ['UserId', 'createdAt'],
          include: [{ model: Reply, attributes: ['UserId', 'createdAt'] }],
        },
        { model: User, attributes: ['YaId'] },
      ],
    });

    return topics.map((t) => {
      const lastMessage = this.getLastCommentOrReply(t);
      return {
        authorId: t.UserId,
        authorYaId: t.User.YaId,
        commentsNumber: this.countComments(t),
        topicName: t.TopicName,
        lastMessageAuthor: lastMessage?.UserId ?? null,
        lastMessageDate: lastMessage?.createdAt ?? null,
      };
    });
  }

  private getLastCommentOrReply(topic: ForumTopic) {
    const repliesWithDates = {} as Record<number, Reply>;
    const commentsWithDates = {} as Record<number, Comment>;

    const commentDates = topic.Comments.map((c) => {
      const time = c.createdAt.getTime();
      commentsWithDates[time] = c;
      return time;
    });
    let repliesDates: number[] = [];

    topic.Comments.forEach((c) => {
      const dates = c.Replies.map((r) => {
        const time = r.createdAt.getTime();
        repliesWithDates[time] = r;
        return time;
      });
      repliesDates = [...repliesDates, ...dates];
    });

    if (commentDates.length === 0 && repliesDates.length === 0) {
      return null;
    }

    const maxReplyDate = Math.max(...repliesDates);
    const maxCommentDate = Math.max(...commentDates);

    if (maxReplyDate > maxCommentDate) {
      return repliesWithDates[maxReplyDate];
    }

    return commentsWithDates[maxCommentDate];
  }

  private countComments(topic: ForumTopic) {
    let count = topic.Comments.length;

    topic.Comments.forEach((y) => {
      count += y.Replies.length;
    });

    return count;
  }
}
