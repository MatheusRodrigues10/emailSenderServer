import express from "express";
import requireLogin from "../middlewares/requireLogin.js";
import { processPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/stripe", requireLogin, processPayment);

export default router;
