import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SurveyForm from "../components/SurveyForm";
import SurveyFormReview from "../components/SurveyFormReview";
import { RootState } from "../redux/store";

const SurveyNew = () => {
  const [showReview, setShowReview] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  if (!user) return null;

  if (user.credits < 1) {
    return (
      <div className="px-4">
        <div className="max-w-xl mx-auto mt-24 bg-white p-8 rounded-2xl shadow-md border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-[#2E2E2E] mb-4">
            Créditos insuficientes
          </h2>
          <p className="text-[#555] mb-6">
            Para criar uma nova pesquisa, é necessário adicionar créditos à sua
            conta.
          </p>
          <button
            onClick={() => navigate("/payments")}
            className="bg-[#6C9BCF] hover:bg-[#558ACB] active:scale-95 active:bg-[#4C7BB5] text-white font-semibold py-3 px-6 rounded-xl transition duration-150 ease-in-out cursor-pointer"
          >
            Adicionar Créditos
          </button>
        </div>
      </div>
    );
  }

  //mostra a review após usuario clicar em proximo
  return (
    <div className="px-4 sm:px-0">
      {showReview ? (
        <SurveyFormReview setShowReview={setShowReview} />
      ) : (
        <SurveyForm setShowReview={setShowReview} />
      )}
    </div>
  );
};

export default SurveyNew;
