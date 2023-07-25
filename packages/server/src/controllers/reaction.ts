import { RequestHandler } from 'express';

import { TCreateReactionDto } from '../dtos/createReactionDto';
import { TReactionDto } from '../dtos/reactionDTO';
import { IReactionService } from '../services/reactionService';

export interface IReactionController {
  create: RequestHandler<void, TReactionDto, TCreateReactionDto>;
  getReactionByTopicId: RequestHandler<void, TReactionDto[], void, { topicId: number }>;
}

export class ReactionController implements IReactionController {
  constructor(private reactionService: IReactionService) {}

  create: RequestHandler<void, TReactionDto, TCreateReactionDto> = async (req, res, next) => {
    try {
      const result = await this.reactionService.createReaction(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  };

  getReactionByTopicId: RequestHandler<void, TReactionDto[], void, { topicId: number }> = async (
    req,
    res,
    next
  ) => {
    try {
      const result = await this.reactionService.getReactionByTopicId(req.query.topicId);

      res.send(result);
    } catch (error) {
      next(error);
    }
  };
}
