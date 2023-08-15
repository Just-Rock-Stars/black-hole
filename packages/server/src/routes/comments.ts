import { Router } from 'express';

import { sequelize } from '../../db';
import { CommentsController } from '../controllers/comments';
import { CommentsService } from '../services/commentsService';

const router = Router();

const controller = new CommentsController(new CommentsService(sequelize));

router.post('/', controller.post);
router.get('/', controller.getCommentsByTopicId);

export default router;
