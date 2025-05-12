import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";

//inicializa modelo.
import "./models/User.js";
//inicializa o passport
import "./services/passport.js";
//import de variáveis sensíveis
import keys from "./config/keys.js";

//import de rotas
import billingRoutes from "./routes/billingRoutes.js";
import authRoutes from "./routes/authRoutes.js";

//conexão ao MongoDB com mongoose
mongoose.connect(keys.mongoURI);

const app = express();
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// rotas da aplicação
app.use("/auth", authRoutes);
app.use("/pay", billingRoutes);

// Corrige o __dirname para ambiente Windows (sem barra inicial)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// arquivos estáticos da build do Vite
app.use(express.static(path.join(__dirname, "client", "dist")));

/* Criamos uma rota coringa (*) pra sempre mandar o index.html
Isso garante que o React funcione com rotas, tipo
/dashboard, /perfil, etc. */
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "client", "dist", "index.html");
  res.sendFile(indexPath);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
