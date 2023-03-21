import express from 'express';
import MenuItemController from '../controllers/menuItem.controller';

const router = express.Router();

router.route('/getMenuItems').get(MenuItemController.getMenuItems);

export default router;
