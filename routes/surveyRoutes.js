import express from "express";
import mongoose from "mongoose";
import Mailer from "../services/Mailer.js";
import { decodeEmail, encodeEmail } from "../utils/emailEnconder.js";
import requireLogin from "../middlewares/requireLogin.js";
import requireCredits from "../middlewares/requireCredits.js";
import surveyTemplate from "../services/emailTemplates/surveyTemplate.js";
const Survey = mongoose.model("Survey");
const router = express.Router();

//requisita login e verifica se tem créditos
router.post("/", requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const parsedRecipients = recipients
    .split(",")
    .map((email) => ({ email: email.trim() }));

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: parsedRecipients,
    _user: req.user.id,
    dateSent: Date.now(),
  });

  try {
    // Envia e-mail individualmente para cada destinatário com link exclusivo
    for (let recipient of parsedRecipients) {
      const encodedEmail = encodeEmail(recipient.email); // ou encodeEmail(recipient.email)
      const htmlBody = surveyTemplate(survey, encodedEmail); // agora passa o email ao template

      const mailer = new Mailer(
        {
          subject,
          recipients: [recipient], // envia só para ele
        },
        htmlBody
      );

      await mailer.send();
    }

    await survey.save(); // salva a pesquisa
    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (err) {
    console.error("Erro ao enviar a pesquisa:", err);
    const errorMessage =
      err?.response?.body?.errors?.[0]?.message ||
      err?.message ||
      "Erro inesperado ao processar a pesquisa.";
    res.status(422).send({ error: errorMessage });
  }
});

router.get("/webhooks/:surveyId/:choice", async (req, res) => {
  const { surveyId, choice } = req.params;
  const emailEncoded = req.query.email; // supondo que o email está na query, encoded
  const email = decodeEmail(emailEncoded); // decodifica

  try {
    // Atualiza documento Survey, onde existe o email no array recipients e que ainda não respondeu
    const survey = await Survey.findOneAndUpdate(
      {
        _id: surveyId,
        recipients: {
          $elemMatch: { email, responded: false },
        },
      },
      {
        $inc: { [choice]: 1 }, // incrementa yes ou no dinamicamente
        $set: { "recipients.$.responded": true },
        $currentDate: { lastResponded: true },
      },
      { new: true }
    );

    if (survey) {
      return res.send("Obrigado pela resposta!");
    } else {
      return res.status(404).send("Resposta não encontrada ou já registrada.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao processar resposta.");
  }
});

export default router;
