import mongoose from "mongoose";
import Mailer from "../services/Mailer.js";
import { decodeEmail, encodeEmail } from "../utils/emailEnconder.js";
import surveyTemplate from "../services/emailTemplates/surveyTemplate.js";

const Survey = mongoose.model("Survey");

//busca as pesquisas
export const listSurveys = async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false,
  });
  res.send(surveys);
};

//cria a pesquisa envia ao sendgrid e salva no mongoDb
export const createSurvey = async (req, res) => {
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
    for (let recipient of parsedRecipients) {
      const encodedEmail = encodeEmail(recipient.email);
      const htmlBody = surveyTemplate(survey, encodedEmail);

      const mailer = new Mailer({ subject, recipients: [recipient] }, htmlBody);

      await mailer.send();
    }

    await survey.save();
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
};

//requisita e salva dados da resposta do e-mail
export const handleWebhook = async (req, res) => {
  const { surveyId, choice } = req.params;
  const emailEncoded = req.query.email;
  const email = decodeEmail(emailEncoded);

  try {
    const survey = await Survey.findOneAndUpdate(
      {
        _id: surveyId,
        recipients: {
          $elemMatch: { email, responded: false },
        },
      },
      {
        $inc: { [choice]: 1 },
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
};
