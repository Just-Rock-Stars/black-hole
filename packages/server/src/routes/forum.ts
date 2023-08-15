import { Router } from 'express';

import { sequelize } from '../../db';
import { ForumController } from '../controllers/forum';
import { ForumServices } from '../services/forumServices';

export const forumRouter = Router();

const controller = new ForumController(new ForumServices(sequelize));

forumRouter.post('/', controller.create);
forumRouter.get('/', controller.getAll);
