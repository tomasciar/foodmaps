import express from 'express';
import RestaurantController from '../controllers/restaurant.controller';

const router = express.Router();

router.route('/getRestaurants/:startingAtIndex/:numberOfItems/').get(RestaurantController.getRestaurants);

export default router;
