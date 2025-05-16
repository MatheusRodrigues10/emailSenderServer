import express from "express";
import passport from "passport";
import keys from "../config/keys.js";

const router = express.Router();

//rota de autenticação
router.get(
  "/google/",
  passport.authenticate("google", {
    scope: ["profile", "email"], //escopo para pegar perfil e email
  })
);

//callback pós autenticcação
router.get("/google/callback", passport.authenticate("google"), (_, res) => {
  res.redirect(`${keys.CLIENT_URL}/surveys`);
});

//desloga o usuário
router.get("/api/logout", (req, res) => {
  // Remove a sessão do usuário
  req.logout();
  res.redirect(`${keys.CLIENT_URL}`); //envia o user pora pogina inicial
});

//rota para teste de requisição
router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

export default router;
