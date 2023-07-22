import { Router } from 'express';

import { sequelize } from '../../db';
import { TopicController } from '../controllers/topic';
import { TopicService } from '../services/topicsService';

const router = Router();

const controller = new TopicController(new TopicService(sequelize));

router.post('/', controller.create);
router.get('/', controller.getByForumId);

export default router;
