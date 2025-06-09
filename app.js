// app.js
import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import keys from "./config/keys.js";

// Inicializações
import "./models/User.js";
import "./models/Survey.js";
import "./services/passport.js";

// Rotas
import billingRoutes from "./routes/billingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import surveyRoutes from "./routes/surveyRoutes.js";

// MongoDB
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

app.use("/auth", authRoutes);
app.use("/pay", billingRoutes);
app.use("/survey", surveyRoutes);

// Arquivos estaticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "client", "dist", "index.html");
  res.sendFile(indexPath);
});

export default app;
