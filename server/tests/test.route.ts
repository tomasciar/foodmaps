import express from 'express';
import Test from './test.controller';

const router = express.Router();

router.route('/testFunction').get(Test.testFunction);

export default router;