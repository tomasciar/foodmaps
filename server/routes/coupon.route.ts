import express from 'express';
import CouponController from '../controllers/coupon.controller';

const router = express.Router();

router.route('/getCoupons').get(CouponController.getCoupons);
router.route('/getCouponsBySource').get(CouponController.getCouponsBySource);

export default router;
