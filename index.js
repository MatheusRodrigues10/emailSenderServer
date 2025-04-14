import express from "express";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
//inicializa modelo.
import "./models/User.js";
//inicialiaza o passport
import "./services/passport.js";
//import de variaveis sensiveis
import keys from "./config/keys.js";

//conexão ao mongoDb com moongose
mongoose.connect(keys.mongoURI);

const app = express();

//configurar cookies
app.use(
  cookieSession({
    //maximo de dias antes de expirar (no caso 30)
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //key para encriptografar cookie
    keys: [keys.cookieKey],
  })
);

//inicia o passport, habilita o suporte a sessões persistententes usa express-session
app.use(passport.initialize());
app.use(passport.session());

//usa o middlewere para todas as rotas de autenticação
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 5000");
});
