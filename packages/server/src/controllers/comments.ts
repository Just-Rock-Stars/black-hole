import { RequestHandler } from 'express';

import { TCommentDto } from '../dtos/commentDto';
import { TCreateCommentDto } from '../dtos/createCommentDto';
import { ICommentsServices } from '../services/commentsService';

export interface ICommentsController {
  post: RequestHandler<void, TCommentDto, TCreateCommentDto>;
  getCommentsByTopicId: RequestHandler<void, TCommentDto[], void, { topicId: number }>;
}

export class CommentsController implements ICommentsController {
  constructor(private _commentsService: ICommentsServices) {}

  post: RequestHandler<void, TCommentDto, TCreateCommentDto> = async (req, res, next) => {
    try {
      const comment = await this._commentsService.createComment(req.body);

      res.send(comment);
    } catch (error) {
      next(error);
    }
  };

  getCommentsByTopicId: RequestHandler<void, TCommentDto[], void, { topicId: number }> = async (
    req,
    res,
    next
  ) => {
    try {
      const comments = await this._commentsService.getCommentsAndRepliesByTopicId(
        req.query.topicId
      );

      res.send(comments);
    } catch (error) {
      next(error);
    }
  };
}
