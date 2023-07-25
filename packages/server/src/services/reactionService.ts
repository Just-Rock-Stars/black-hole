import { Sequelize } from 'sequelize';

import { ForumTopic } from '../Models/ForumTopic';
import { Reaction } from '../Models/Reaction';
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

    if (topic === null) {
      throw new NotFountError("Topic doesn't exist");
    }

    const creationDate = new Date();
    console.log(topic);
    const result = await this._db.transaction((t) => {
      return Reaction.create(
        {
          Type: type,
          UserId: userId,
          ForumTopic: topic,
          TopicId: topicId,
          createdAt: creationDate,
          updatedAt: creationDate,
        },
        { transaction: t }
      );
    });

    return {
      type: result.Type,
      userId: result.UserId,
      topicId: result.TopicId,
    };
  }
  // @ts-ignore
  getReactionByTopicId: (topicId: number) => Promise<TReactionDto[]> = async (topicId) => {
    const topic = await ForumTopic.findByPk(topicId);

    if (!topic) {
      throw new NotFountError("Topic doesn't exist");
    }
    console.log(topic);
    // @ts-ignore
    return topic;
  };

  // public async getAllReaction(): Promise<TReactionDto[]> {
  //   const reactions = await Reaction.findAll({
  //     include: { model: ReactionTopic },
  //     // include: { model: ForumTopic, include: [{ model: Comment, include: [{ model: Reply }] }] },
  //   });

  //   console.log(reactions);
  //   // @ts-ignore
  //   const result: TReactionDto[] = reactions.map((x) => ({
  //     ...x,
  //     // creationDate: x.createdAt,
  //     // id: x.id,
  //   }));

  //   return result;
  // }

  // private countComments(forum: Forum) {
  //   let count = 0;

  //   forum.Topics.forEach((y) => {
  //     count += y.Comments.length;
  //     y.Comments.forEach((z) => (count += z.Replies.length));
  //   });

  //   return count;
  // }
}
