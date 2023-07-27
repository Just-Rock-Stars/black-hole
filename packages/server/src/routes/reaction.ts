import { Router } from 'express';

import { sequelize } from '../../db';
import { ReactionController } from '../controllers/reaction';
import { ReactionService } from '../services/reactionService';

export const reactionRouter = Router();

const controller = new ReactionController(new ReactionService(sequelize));

reactionRouter.get('/', controller.getReactionByTopicId);
reactionRouter.post('/', controller.create);
reactionRouter.delete('/', controller.destroyReaction);
