import { Router } from 'express';

import { sequelize } from '../../db';
import { ReactionController } from '../controllers/reaction';
import { ReactionService } from '../services/reactionService';

export const reactionRouter = Router();

const controller = new ReactionController(new ReactionService(sequelize));

reactionRouter.post('/', controller.create);
reactionRouter.get('/', controller.getReactionByTopicId);
