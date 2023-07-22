import { RequestHandler } from 'express';

import { TCommentDto } from '../dtos/commentDto';
import { TCreateCommentDto } from '../dtos/createCommentDto';
import { ICommentsServices } from '../services/commentsService';

export interface ICommentsController {
  post: RequestHandler<void, TCommentDto, TCreateCommentDto>;
  getCommentsByTopicId: RequestHandler<{ topicId: number }, TCommentDto[], void>;
}

export class CommentsController implements ICommentsController {
  constructor(private _commentsService: ICommentsServices) {}

  post: RequestHandler<void, TCommentDto, TCreateCommentDto> = async (req, res) => {
    const comment = await this._commentsService.createComment(req.body);

    res.send(comment);
  };

  getCommentsByTopicId: RequestHandler<{ topicId: number }, TCommentDto[], void> = async (
    req,
    res
  ) => {
    const comments = await this._commentsService.getCommentsAndRepliesByTopicId(req.params.topicId);

    res.send(comments);
  };
}
