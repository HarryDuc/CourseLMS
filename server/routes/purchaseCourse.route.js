import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook, handlePaymentSuccess } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/webhook").post(stripeWebhook);
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated, getCourseDetailWithPurchaseStatus);
router.route("/course/:courseId/payment-success").post(isAuthenticated, handlePaymentSuccess);
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;