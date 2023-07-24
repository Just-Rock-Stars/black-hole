import { RequestHandler } from 'express';

import { TCreateForumDto } from '../dtos/createForumDto';
import { TForumDto } from '../dtos/forumDto';
import { IForumService } from '../services/forumServices';

export interface IForumController {
  create: RequestHandler<TCreateForumDto, TForumDto>;
  getAll: RequestHandler<void, TForumDto[]>;
}

export class ForumController implements IForumController {
  constructor(private _forumService: IForumService) {}

  public create: RequestHandler<TCreateForumDto, TForumDto> = async (req, res, next) => {
    try {
      const result = await this._forumService.createForum(req.body);
      res.send(result);
    } catch (error) {
      next(error);
    }
  };

  public getAll: RequestHandler<void, TForumDto[]> = async (_req, res, next) => {
    try {
      const result = await this._forumService.getAllForums();

      res.send(result);
    } catch (error) {
      next(error);
    }
  };
}
