import express from "express";
import mongoose from "mongoose";
import Mailer from "../services/Mailer.js";
import requireLogin from "../middlewares/requireLogin.js";
import requireCredits from "../middlewares/requireCredits.js";
import surveyTemplate from "../services/emailTemplates/surveyTemplate.js";

const Survey = mongoose.model("Survey");
const router = express.Router();

//requisita login e verifica se tem créditos
router.post("/", requireLogin, requireCredits, (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  //TODO lógica de enviar o email>
  const mailer = new Mailer(survey, surveyTemplate(survey));
});

export default router;
