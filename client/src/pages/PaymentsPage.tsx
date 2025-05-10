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
  //redux
  const dispatch = useDispatch<AppDispatch>();

  //stripe
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
      console.log("token", paymentMethod.id, amount);
      dispatch(handleToken({ token: paymentMethod.id, amount }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
        Adicionar Créditos
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          Número do Cartão
        </label>
        <div className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
          <CardNumberElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#fff",
                  "::placeholder": {
                    color: "#a0aec0",
                  },
                },
                invalid: {
                  color: "#e53e3e",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            Data de Validade
          </label>
          <div className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#fff",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#e53e3e",
                  },
                },
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            CVV
          </label>
          <div className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
            <CardCvcElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#fff",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#e53e3e",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          Nome no Cartão
        </label>
        <input
          type="text"
          placeholder="Nome completo"
          className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
      >
        Adicionar 5 Créditos – R$5,00
      </button>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
        Cada crédito permite o envio de 5 e-mails.
      </p>
    </form>
  );
};

const PaymentsPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default PaymentsPage;
