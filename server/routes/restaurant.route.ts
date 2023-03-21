import express from 'express';
import RestaurantController from '../controllers/restaurant.controller';

const router = express.Router();

router.route('/getRestaurants').get(RestaurantController.getRestaurants);

export default router;
