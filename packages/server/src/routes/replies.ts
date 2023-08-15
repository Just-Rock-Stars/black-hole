import { Router } from 'express';

import { sequelize } from '../../db';
import { RepliesController } from '../controllers/replies';
import { RepliesService } from '../services/repliesService';

const router = Router();

const controller = new RepliesController(new RepliesService(sequelize));

router.post('/', controller.create);

export default router;
