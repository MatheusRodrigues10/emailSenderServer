import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setSurveyData } from "../redux/features/surveySlice";

//hook que valida e-mail
import validateEmails from "../hooks/validateEmails";

type SurveyFormData = {
  surveyTitle: string;
  subject: string;
  body: string;
  recipients: string;
};

type Props = {
  setShowReview: (show: boolean) => void;
};

const SurveyForm = ({ setShowReview }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const surveyData = useSelector((state: RootState) => state.survey);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SurveyFormData>({
    defaultValues: surveyData, //popula os inputs
  });

  const onSubmit = (data: SurveyFormData) => {
    dispatch(setSurveyData(data));
    setShowReview(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 w-full max-w-2xl mx-auto mt-16"
    >
      <h2 className="text-2xl font-bold text-[#2E2E2E] text-center mb-6">
        Criar Nova Pesquisa
      </h2>

      {/* Título da Pesquisa */}
      <div className="mb-4">
        <label className="block text-[#2E2E2E] font-medium mb-1">
          Título da Pesquisa
        </label>
        <input
          {...register("surveyTitle", { required: "Campo obrigatório" })}
          placeholder="Ex: Satisfação do Cliente"
          className="w-full border border-gray-200 rounded-xl p-3 bg-[#F9FAFB] text-[#1a202c] placeholder-[#90a4ae] focus:ring-2 focus:ring-[#6C9BCF] focus:outline-none"
        />
        {errors.surveyTitle && (
          <p className="text-sm text-red-600 mt-1">
            {errors.surveyTitle.message}
          </p>
        )}
      </div>

      {/* Assunto do Email */}
      <div className="mb-4">
        <label className="block text-[#2E2E2E] font-medium mb-1">
          Assunto do E-mail
        </label>
        <input
          {...register("subject", { required: "Campo obrigatório" })}
          placeholder="Ex: Avaliação de Serviço"
          className="w-full border border-gray-200 rounded-xl p-3 bg-[#F9FAFB] text-[#1a202c] placeholder-[#90a4ae] focus:ring-2 focus:ring-[#6C9BCF] focus:outline-none"
        />
        {errors.subject && (
          <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
        )}
      </div>

      {/* Corpo do Email */}
      <div className="mb-4">
        <label className="block text-[#2E2E2E] font-medium mb-1">
          Mensagem do E-mail
        </label>
        <textarea
          {...register("body", { required: "Campo obrigatório" })}
          placeholder="Digite uma introdução breve antes da pergunta 'Sim ou Não'"
          className="w-full border border-gray-200 rounded-xl p-3 bg-[#F9FAFB] text-[#1a202c] placeholder-[#90a4ae] h-32 resize-none focus:ring-2 focus:ring-[#6C9BCF] focus:outline-none"
        />
        {errors.body && (
          <p className="text-sm text-red-600 mt-1">{errors.body.message}</p>
        )}
      </div>

      {/* Destinatários */}
      <div className="mb-6">
        <label className="block text-[#2E2E2E] font-medium mb-1">
          Destinatários
        </label>
        <textarea
          {...register("recipients", {
            required: "Campo obrigatório",
            validate: (value) => {
              const error = validateEmails(value);
              return error || true;
            },
          })}
          placeholder="ex: google@gmail.com, facebook@gmail.com"
          className="w-full border border-gray-200 rounded-xl p-3 bg-[#F9FAFB] text-[#1a202c] placeholder-[#90a4ae] h-24 resize-none focus:ring-2 focus:ring-[#6C9BCF] focus:outline-none"
        />
        <p className="text-sm text-[#6C9BCF] mt-1">
          Separe os e-mails com vírgulas. Ex: user1@gmail.com, user2@gmail.com
        </p>
        {errors.recipients && (
          <p className="text-sm text-red-600 mt-1 break-words whitespace-pre-wrap">
            {errors.recipients.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#6C9BCF] hover:bg-[#558ACB] text-white font-semibold py-3 px-4 rounded-xl transition cursor-pointer"
      >
        Próximo
      </button>
    </form>
  );
};

export default SurveyForm;
