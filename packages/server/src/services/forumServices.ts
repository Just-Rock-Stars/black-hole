import { Sequelize } from 'sequelize';

import { Comment } from '../Models/Comment';
import { Forum } from '../Models/Forum';
import { ForumTopic } from '../Models/ForumTopic';
import { Reply } from '../Models/Reply';
import { TCreateForumDto } from '../dtos/createForumDto';
import { TForumDto } from '../dtos/forumDto';

export interface IForumService {
  createForum(dto: TCreateForumDto): Promise<TForumDto>;

  getAllForums(): Promise<TForumDto[]>;
}

export class ForumServices implements IForumService {
  constructor(private _db: Sequelize) {}
  public async createForum({ description, name }: TCreateForumDto) {
    const forum = await this._db.transaction((t) => {
      return Forum.create(
        {
          Description: description,
          Name: name,
          Topics: [],
        },
        { transaction: t }
      );
    });

    return {
      id: forum.id,
      commentsNumber: 0,
      topicsNumber: 0,
      creationDate: forum.createdAt,
      description: forum.Description,
      name: forum.Name,
    };
  }

  public async getAllForums(): Promise<TForumDto[]> {
    const forums = await Forum.findAll({
      include: { model: ForumTopic, include: [{ model: Comment, include: [{ model: Reply }] }] },
    });

    const commentNumbers = {} as Record<string, number>;

    forums.forEach((x) => {
      const count = this.countComments(x);

      commentNumbers[x.Name] = count;
    });

    const result: TForumDto[] = forums.map((x) => ({
      commentsNumber: commentNumbers[x.Name],
      creationDate: x.createdAt,
      description: x.Description,
      id: x.id,
      name: x.Name,
      topicsNumber: x.Topics.length,
    }));

    return result;
  }

  private countComments(forum: Forum) {
    let count = 0;

    forum.Topics.forEach((y) => {
      count += y.Comments.length;
      y.Comments.forEach((z) => (count += z.Replies.length));
    });

    return count;
  }
}
