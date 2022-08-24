import express from 'express';
import Test from '../controllers/test.controller.js';

const router = express.Router();

router.route('/testFunction').get(Test.testFunction);

export default router;
