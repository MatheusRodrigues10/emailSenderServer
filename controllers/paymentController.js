import Stripe from "stripe";
import mongoose from "mongoose";
import keys from "../config/keys.js";

const stripe = new Stripe(keys.stripeSecretKey);
const User = mongoose.model("User");

//verifica se o pagamento é válido e adiciona créditos.
export const processPayment = async (req, res) => {
  try {
    const { token, amount } = req.body;

    if (!token || !amount) {
      return res.status(400).json({ message: "Token ou valor ausente" });
    }

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

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { credits: 5 } },
      { new: true }
    );

    res.send(updatedUser);
  } catch (err) {
    console.error("Erro no pagamento:", err.message);
    res.status(500).json({ error: "Erro no processamento do pagamento" });
  }
};
