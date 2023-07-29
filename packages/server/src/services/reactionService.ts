import { ForumTopic } from '../Models/ForumTopic';
import { Reaction } from '../Models/Reaction';
import { User } from '../Models/User';
import { TCreateReactionDto } from '../dtos/createReactionDto';
import { TReactionDto } from '../dtos/reactionDTO';
import { TUserDto } from '../dtos/userDto';
import { BadRequest, NotFountError } from '../middlewares/errors';

export interface IReactionService {
  createReaction(dto: TCreateReactionDto, user?: TUserDto): Promise<TReactionDto>;

  getReactionByTopicId(id: number, user?: TUserDto): Promise<TReactionDto[]>;

  destroyReactionByTopicId(id: number, user?: TUserDto): Promise<string>;
}

export class ReactionService implements IReactionService {
  public async createReaction({ type, topicId }: TCreateReactionDto, user: TUserDto) {
    if (!user) {
      throw new NotFountError("You don't have access, you need to log in");
    }

    if (!type) {
      throw new NotFountError("No 'type' field");
    }

    if (typeof type !== 'string') {
      throw new BadRequest("Field 'type' must be a string type");
    }

    if (!topicId) {
      throw new NotFountError("No 'topicId' field");
    }

    const topic = await ForumTopic.findByPk(topicId);

    if (topic === null) {
      throw new NotFountError("Topic doesn't exist");
    }

    const avatarUrl = user.avatar
      ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}`
      : null;

    const [existingAuthor] = await User.findOrCreate({
      where: { YaId: user.id },
      defaults: {
        Comments: [],
        Name: user.first_name,
        Replies: [],
        Topics: [],
        YaId: user.id,
        Avatar: avatarUrl,
      },
    });

    if (!existingAuthor) {
      throw new NotFountError("Author doesn't exist");
    }

    const creationDate = new Date();

    const [result] = await Reaction.upsert({
      Type: type,
      User: existingAuthor,
      UserId: existingAuthor?.id,
      ForumTopic: topic,
      TopicId: topic.id,
      createdAt: creationDate,
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
