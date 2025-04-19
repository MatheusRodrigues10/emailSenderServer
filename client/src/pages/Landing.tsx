import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const Landing = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const buttonClass =
    "bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-blue-700 transition-all duration-300";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
        Bem-vindo ao <span className="text-blue-600">Reativa</span>
      </h1>
      <p className="text-lg md:text-xl text-blue-700 mb-6 max-w-xl">
        Colete feedbacks relevantes dos seus usuários e otimize sua aplicação
        com base em dados reais.
      </p>

      {/* Usa Link apenas se tiver logado por conta da rota de login */}
      {user ? (
        <Link to="/surveys" className={buttonClass}>
          Ir ao Painel
        </Link>
      ) : (
        <a href="/auth/google" className={buttonClass}>
          Comece Agora
        </a>
      )}
    </div>
  );
};

export default Landing;
