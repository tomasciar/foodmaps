import express from 'express';
import RestaurantController from '../controllers/restaurant.controller';

const router = express.Router();

router.route('/getRestaurants').get(RestaurantController.getRestaurants);
router.route('/getRestaurantsByDistance').get(RestaurantController.getRestaurantsByDistance);

export default router;
