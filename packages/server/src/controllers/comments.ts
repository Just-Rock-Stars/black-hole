import { RequestHandler } from 'express';

import { TCommentDto } from '../dtos/commentDto';
import { TPostCommentDto } from '../dtos/postCommentDto';
import { ICommentsServices } from '../services/commentsService';

export interface ICommentsController {
  post: RequestHandler<void, TCommentDto, TPostCommentDto>;
  getCommentsByTopicId: RequestHandler<{ topicId: number }, TCommentDto[], void>;
}

export class CommentsController implements ICommentsController {
  constructor(private _commentsService: ICommentsServices) {}

  post: RequestHandler<void, TCommentDto, TPostCommentDto> = async (req, res) => {
    const comment = await this._commentsService.createComment(req.body);

    res.send(comment);
  };

  getCommentsByTopicId: RequestHandler<{ topicId: number }, TCommentDto[], void> = async (
    req,
    res
  ) => {
    const comments = await this._commentsService.getCommentsByTopicId(req.params.topicId);

    res.send(comments);
  };
}
