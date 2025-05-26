import express from "express";
import mongoose from "mongoose";
import Mailer from "../services/Mailer.js";
import requireLogin from "../middlewares/requireLogin.js";
import requireCredits from "../middlewares/requireCredits.js";
import surveyTemplate from "../services/emailTemplates/surveyTemplate.js";

const Survey = mongoose.model("Survey");
const router = express.Router();

//rota para callback de usuário ao clicar em sim ou não
router.get("/thanks", (req, res) => {
  res.send("Agradecemos sua resposta!!");
});

//requisita login e verifica se tem créditos
router.post("/", requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    await mailer.send(); // envia e-mail
    await survey.save(); // salva a pesquisa
    req.user.credits -= 1; // debita crédito
    const user = await req.user.save(); // salva usuário com créditos atualizados

    res.send(user); // retorna usuário atualizado.
  } catch (err) {
    console.error("Erro ao enviar a pesquisa:", err);

    // Extrai mensagens do erro (ex: SendGrid, Mongo, etc)
    const errorMessage =
      err?.response?.body?.errors?.[0]?.message || // SendGrid
      err?.message || // Erros genéricos
      "Erro inesperado ao processar a pesquisa."; // Fallback

    res.status(422).send({ error: errorMessage });
  }
});

export default router;
