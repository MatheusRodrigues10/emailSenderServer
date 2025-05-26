import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
import { handleToken } from "../redux/features/authSlice";
import { AppDispatch } from "../redux/store";

const CheckoutForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stripe = useStripe();
  const elements = useElements();
  const amount = 500; // R$5,00

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      console.error(error);
    } else {
      dispatch(handleToken({ token: paymentMethod.id, amount }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-[#2E2E2E] text-center mb-6">
        Adicionar Créditos
      </h2>

      <div className="mb-4">
        <label className="block text-[#2E2E2E] font-medium mb-1">
          Número do Cartão
        </label>
        <div className="border border-gray-200 rounded-xl p-3 bg-[#F9FAFB]">
          <CardNumberElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1a202c",
                  "::placeholder": { color: "#90a4ae" },
                },
                invalid: { color: "#e53e3e" },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[#2E2E2E] font-medium mb-1">
            Data de Validade
          </label>
          <div className="border border-gray-200 rounded-xl p-3 bg-[#F9FAFB]">
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1a202c",
                    "::placeholder": { color: "#90a4ae" },
                  },
                  invalid: { color: "#e53e3e" },
                },
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-[#2E2E2E] font-medium mb-1">CVV</label>
          <div className="border border-gray-200 rounded-xl p-3 bg-[#F9FAFB]">
            <CardCvcElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1a202c",
                    "::placeholder": { color: "#90a4ae" },
                  },
                  invalid: { color: "#e53e3e" },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-[#2E2E2E] font-medium mb-1">
          Nome no Cartão
        </label>
        <input
          type="text"
          placeholder="Nome completo"
          className="w-full border border-gray-200 rounded-xl p-3 bg-[#F9FAFB] text-[#1a202c] placeholder-[#90a4ae] focus:ring-2 focus:ring-[#6C9BCF] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-[#6C9BCF] hover:bg-[#558ACB] text-white font-semibold py-3 px-4 rounded-xl transition"
      >
        Adicionar 5 Créditos – R$5,00
      </button>

      <p className="text-sm text-[#6C9BCF] text-center mt-3">
        Cada crédito permite realizar uma pesquisa individual.
      </p>
    </form>
  );
};

const PaymentsPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-white px-4">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default PaymentsPage;
