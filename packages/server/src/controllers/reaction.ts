import { Request, RequestHandler } from 'express';

import { TCreateReactionDto } from '../dtos/createReactionDto';
import { TReactionDto } from '../dtos/reactionDTO';
import { TUserDto } from '../dtos/userDto';
import { IReactionService } from '../services/reactionService';

export interface IReactionController {
  create: RequestHandler<void, TReactionDto, TCreateReactionDto>;
  getReactionByTopicId: RequestHandler<void, TReactionDto[], void, { topicId: number }>;
}

interface ICustomRequestGetReaction<T, K> extends Request<void, TReactionDto[], void, K> {
  user?: T;
}

interface ICustomRequestCreateReaction<T> extends Request<void, TReactionDto, TCreateReactionDto> {
  user?: T;
}

export class ReactionController implements IReactionController {
  constructor(private reactionService: IReactionService) {}

  create: RequestHandler<void, TReactionDto, TCreateReactionDto> = async (
    req: ICustomRequestCreateReaction<TUserDto>,
    res,
    next
  ) => {
    try {
      const result = await this.reactionService.createReaction(req.body, req.user);
      res.send(result);
    } catch (error) {
      next(error);
    }
  };

  getReactionByTopicId: RequestHandler<void, TReactionDto[], void, { topicId: number }> = async (
    req: ICustomRequestGetReaction<TUserDto, { topicId: number }>,
    res,
    next
  ) => {
    try {
      const result = await this.reactionService.getReactionByTopicId(req.query.topicId, req.user);

      res.send(result);
    } catch (error) {
      next(error);
    }
  };
}
