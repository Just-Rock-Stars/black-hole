import { RequestHandler } from 'express';

import { TCreateReplyDto } from '../dtos/createReplyDto';
import { TReplyDto } from '../dtos/replyDto';
import { IRepliesService } from '../services/repliesService';

export interface IRepliesController {
  create: RequestHandler<void, TReplyDto, TCreateReplyDto>;
}

export class RepliesController implements IRepliesController {
  constructor(private _repliesService: IRepliesService) {}

  create: RequestHandler<void, TReplyDto, TCreateReplyDto> = async (req, res, next) => {
    try {
      const reply = await this._repliesService.createReply(req.body);

      res.send(reply);
    } catch (error) {
      next(error);
    }
  };
}
