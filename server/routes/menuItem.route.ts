import express from 'express';
import MenuItemController from '../controllers/menuItem.controller';

const router = express.Router();

router.route('/getMenuItems').get(MenuItemController.getMenuItems);
router.route('/getMenuItemsByDistance').get(MenuItemController.getMenuItemsByDistance);
router.route('/getMenuItemByUrl').get(MenuItemController.getMenuItemByUrl);
router.route('/getMenuItemsByName').get(MenuItemController.getMenuItemsByName);

export default router;
