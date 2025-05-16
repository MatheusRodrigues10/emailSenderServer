import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const Landing = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const buttonClass =
    "bg-[#6C9BCF] hover:bg-[#558ACB] text-white px-6 py-3 rounded-xl shadow-md transition duration-300";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] p-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-[#2E2E2E] mb-4">
        Bem-vindo ao <span className="text-[#6C9BCF]">Reativa</span>
      </h1>

      <p className="text-lg md:text-xl text-[#4A4A4A] mb-6 max-w-xl">
        Colete feedbacks relevantes dos seus usuários e otimize sua aplicação
        com base em dados reais.
      </p>

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
