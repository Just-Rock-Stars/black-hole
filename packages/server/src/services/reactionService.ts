import { Sequelize } from 'sequelize';

import { ForumTopic } from '../Models/ForumTopic';
import { Reaction } from '../Models/Reaction';
import { User } from '../Models/User';
import { TCreateReactionDto } from '../dtos/createReactionDto';
import { TReactionDto } from '../dtos/reactionDTO';
import { NotFountError } from '../middlewares/errors';

export interface IReactionService {
  createReaction(dto: TCreateReactionDto): Promise<TReactionDto>;

  getReactionByTopicId(id: number): Promise<TReactionDto[]>;
}

export class ReactionService implements IReactionService {
  constructor(private _db: Sequelize) {}
  public async createReaction({ type, userId, topicId }: TCreateReactionDto) {
    const topic = await ForumTopic.findByPk(topicId);

    if (!type) {
      throw new NotFountError('No "type" field');
    }

    if (topic === null) {
      throw new NotFountError("Topic doesn't exist");
    }

    const user = await User.findByPk(userId);

    if (user === null) {
      throw new NotFountError("User doesn't exist");
    }

    const creationDate = new Date();

    const reactionDestroy = await Reaction.findOne({
      where: {
        Type: type,
        TopicId: topicId,
        UserId: userId,
      },
    });

    const reactionUpdate = await Reaction.findOne({
      where: {
        TopicId: topicId,
        UserId: userId,
      },
    });

    let text: string | null = null;

    const result = await this._db.transaction(async (t) => {
      if (reactionDestroy) {
        await Reaction.destroy({
          where: {
            Type: type,
            UserId: userId,
            TopicId: topicId,
          },
        });

        text = 'Reaction removed';
      } else if (reactionUpdate) {
        await Reaction.update(
          {
            Type: type,
            User: user,
            UserId: userId,
            ForumTopic: topic,
            TopicId: topic.id,
            createdAt: creationDate,
            updatedAt: creationDate,
          },
          { where: { id: reactionUpdate.id }, transaction: t }
        );

        text = 'Reaction updated';
      }
      return await Reaction.create(
        {
          Type: type,
          User: user,
          UserId: userId,
          ForumTopic: topic,
          TopicId: topic.id,
          createdAt: creationDate,
          updatedAt: creationDate,
        },
        { transaction: t }
      );
    });

    return text
      ? text
      : {
          type: result.Type,
          userId: result.UserId,
          topicId: result.TopicId,
        };
  }

  getReactionByTopicId: (topicId: number) => Promise<TReactionDto[]> = async (topicId) => {
    const topic = await ForumTopic.findByPk(topicId);

    if (!topic) {
      throw new NotFountError("Topic doesn't exist");
    }

    const reations = await Reaction.findAll({
      where: {
        TopicId: topicId,
      },
    });

    return reations.map((x) => ({
      id: x.id,
      type: x.Type,
      userId: x.UserId,
      topicId: x.TopicId,
    }));
  };
}
