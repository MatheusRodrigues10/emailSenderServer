import express from "express";
import Stripe from "stripe";
import keys from "../config/keys.js";
import mongoose from "mongoose";

import requireLogin from "../middlewares/requireLogin.js";

const router = express.Router();
const stripe = new Stripe(keys.stripeSecretKey);
const User = mongoose.model("users");

router.post("/stripe", requireLogin, async (req, res) => {
  try {
    const { token, amount } = req.body;

    //verifica se foi enviado ambos os dados
    if (!token || !amount) {
      return res.status(400).json({ message: "Token ou valor ausente" });
    }

    //valor unico do app no momento.
    if (amount !== 500) {
      return res.status(400).json({ message: "Valor inválido" });
    }

    await stripe.paymentIntents.create({
      amount,
      currency: "brl",
      payment_method: token,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    //incrimenta 5 créditos ao usuário
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { credits: 5 } },
      { new: true }
    );

    res.send(updatedUser);
  } catch (err) {
    console.error("Erro no pagamento:", err.message);

    return res
      .status(500)
      .json({ error: "Erro no processamento do pagamento" });
  }
});

export default router;
