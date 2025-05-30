import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { submitSurvey, resetSurvey } from "../redux/features/surveySlice";

type Props = {
  setShowReview: (show: boolean) => void;
};

const SurveyFormReview = ({ setShowReview }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  const { surveyTitle, subject, body, recipients } = useSelector(
    (state: RootState) => state.survey
  );

  //envia a pesquisa e atualizado o usuario.
  const handleSubmit = async () => {
    if (!user || user.credits < 1) {
      toast.error("Créditos insuficientes para enviar a pesquisa.");
      return;
    }

    try {
      await dispatch(
        submitSurvey({
          surveyTitle,
          subject,
          body,
          recipients,
        })
      ).unwrap(); // Verifica sucesso ou erro

      toast.success("Pesquisa enviada com sucesso.");

      dispatch(resetSurvey()); // Limpa os campos do formulário

      setShowReview(false); // Fecha a tela de review após envio
      navigate("/surveys");
    } catch (error) {
      toast.error("Erro ao enviar a pesquisa. Tente novamente.");
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 w-full max-w-2xl mx-auto mt-16">
      <h2 className="text-2xl font-bold text-[#2E2E2E] text-center mb-6">
        Revisar Pesquisa
      </h2>

      <div className="mb-4">
        <label className="block text-[#2E2E2E] font-medium mb-1">
          Título da Pesquisa
        </label>
        <input
          disabled
          value={surveyTitle}
          className="w-full border border-gray-200 rounded-xl p-3 bg-[#F9FAFB] text-[#1a202c]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#2E2E2E] font-medium mb-1">
          Assunto do E-mail
        </label>
        <input
          disabled
          value={subject}
          className="w-full border border-gray-200 rounded-xl p-3 bg-[#F9FAFB] text-[#1a202c]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#2E2E2E] font-medium mb-1">
          Mensagem do E-mail
        </label>
        <textarea
          disabled
          value={body}
          className="w-full border border-gray-200 rounded-xl p-3 bg-[#F9FAFB] text-[#1a202c] h-32 resize-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-[#2E2E2E] font-medium mb-1">
          Destinatários
        </label>
        <textarea
          disabled
          value={recipients}
          className="w-full border border-gray-200 rounded-xl p-3 bg-[#F9FAFB] text-[#1a202c] h-24 resize-none"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setShowReview(false)}
          className="bg-gray-300 hover:bg-gray-400 text-[#2E2E2E] font-semibold py-3 px-6 rounded-xl transition cursor-pointer"
        >
          Voltar
        </button>

        <button
          onClick={handleSubmit}
          className="bg-[#6C9BCF] hover:bg-[#558ACB] text-white font-semibold py-3 px-6 rounded-xl transition cursor-pointer"
        >
          Enviar Pesquisa
        </button>
      </div>
    </div>
  );
};

export default SurveyFormReview;
