import express from 'express';
import InteractionsController from '../controllers/interactions.controller';

const router = express.Router();

router.route('/clickItem').get(InteractionsController.clickItem);
router.route('/getInteractions').get(InteractionsController.getInteractions);

export default router;
