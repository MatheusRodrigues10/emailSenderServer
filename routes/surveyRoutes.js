import express from "express";
import requireLogin from "../middlewares/requireLogin.js";
import requireCredits from "../middlewares/requireCredits.js";
import {
  listSurveys,
  createSurvey,
  handleWebhook,
} from "../controllers/surveyController.js";

const router = express.Router();

router.get("/data", requireLogin, listSurveys);
router.post("/", requireLogin, requireCredits, createSurvey);
router.get("/webhooks/:surveyId/:choice", handleWebhook);

export default router;
