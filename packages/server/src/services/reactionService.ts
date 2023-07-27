import { Sequelize } from 'sequelize';

import { ForumTopic } from '../Models/ForumTopic';
import { Reaction } from '../Models/Reaction';
import { User } from '../Models/User';
import { TCreateReactionDto } from '../dtos/createReactionDto';
import { TReactionDto } from '../dtos/reactionDTO';
import { TUserDto } from '../dtos/userDto';
import { NotFountError } from '../middlewares/errors';

export interface IReactionService {
  createReaction(dto: TCreateReactionDto, user?: TUserDto): Promise<TReactionDto>;

  getReactionByTopicId(id: number, user?: TUserDto): Promise<TReactionDto[]>;

  destroyReactionByTopicId(id: number, user?: TUserDto): Promise<string>;
}

export class ReactionService implements IReactionService {
  constructor(private _db: Sequelize) {}

  public async createReaction({ type, topicId }: TCreateReactionDto, user: TUserDto) {
    if (!user) {
      throw new NotFountError("You don't have access, you need to log in");
    }

    if (!type) {
      throw new NotFountError("No 'type' field");
    }

    if (!topicId) {
      throw new NotFountError("No 'topicId' field");
    }

    const topic = await ForumTopic.findByPk(topicId);

    if (topic === null) {
      throw new NotFountError("Topic doesn't exist");
    }

    let existingAuthor = await User.findOne({
      where: {
        YaId: user.id,
      },
    });

    if (!existingAuthor) {
      existingAuthor = await User.create({
        Comments: [],
        Name: user.first_name,
        Replies: [],
        Topics: [],
        YaId: user.id,
        Avatar: user?.avatar ?? null,
      });
    }

    const result = await this._db.transaction(async (t) => {
      if (!existingAuthor) {
        throw new NotFountError("Author doesn't exist");
      }
      let reaction = await Reaction.findOne({
        where: {
          TopicId: topicId,
          UserId: existingAuthor.id,
        },
      });

      const creationDate = new Date();

      if (reaction) {
        await reaction.update(
          {
            Type: type,
            User: existingAuthor,
            UserId: existingAuthor?.id,
            ForumTopic: topic,
            TopicId: topic.id,
            createdAt: creationDate,
          },
          { where: { id: reaction.id }, transaction: t }
        );
      } else {
        reaction = await Reaction.create(
          {
            Type: type,
            User: existingAuthor,
            UserId: existingAuthor.id,
            ForumTopic: topic,
            TopicId: topic.id,
            createdAt: creationDate,
          },
          { transaction: t }
        );
      }

      return reaction;
    });

    return {
      type: result.Type,
      ownerReactionId: existingAuthor.YaId,
      topicId: result.TopicId,
    };
  }

  getReactionByTopicId: (topicId: number, user?: TUserDto) => Promise<TReactionDto[]> = async (
    topicId,
    user
  ) => {
    if (!user) {
      throw new NotFountError("You don't have access, you need to log in");
    }

    if (!topicId) {
      throw new NotFountError("Params 'topicId' is not set");
    }

    const topic = await ForumTopic.findByPk(topicId);

    if (!topic) {
      throw new NotFountError("Topic doesn't exist");
    }

    const reations = await Reaction.findAll({
      where: {
        TopicId: topicId,
      },
      include: [
        {
          model: User,
          attributes: ['YaId'],
        },
      ],
    });

    return reations.map((x) => {
      return {
        id: x.id,
        type: x.Type,
        ownerReactionId: x.User.YaId,
        topicId: x.TopicId,
      };
    });
  };

  destroyReactionByTopicId: (topicId: number, user?: TUserDto) => Promise<string> = async (
    topicId,
    user
  ) => {
    if (!user) {
      throw new NotFountError("You don't have access, you need to log in");
    }

    if (!topicId) {
      throw new NotFountError("Params 'topicId' is not set");
    }

    const topic = await ForumTopic.findByPk(topicId);

    if (!topic) {
      throw new NotFountError("Topic doesn't exist");
    }

    const existingAuthor = await User.findOne({
      where: {
        YaId: user.id,
      },
    });

    if (!existingAuthor) {
      throw new NotFountError("Author doesn't exist");
    }

    const reaction = await Reaction.destroy({
      where: {
        TopicId: topicId,
        UserId: existingAuthor.id,
      },
    });

    if (reaction === 0) {
      throw new NotFountError("Reaction doesn't exist");
    }

    return 'Reaction removed';
  };
}
