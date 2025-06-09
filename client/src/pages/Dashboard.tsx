import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSurveyData } from "../redux/features/SurveyDataSlice";
import type { RootState, AppDispatch } from "../redux/store";

export const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.surveyData
  );

  useEffect(() => {
    dispatch(fetchSurveyData());
  }, [dispatch]);

  //formata a data ao padrão br
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-[#6C9BCF] text-lg font-semibold">Carregando...</p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-xl mx-auto mt-16 bg-red-100 p-6 rounded-xl border border-red-300 text-center">
        <p className="text-red-700 font-semibold">Erro: {error}</p>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="max-w-xl mx-auto mt-16 bg-yellow-100 p-6 rounded-xl border border-yellow-300 text-center">
        <p className="text-yellow-700 font-semibold">
          Nenhuma pesquisa disponível no momento.
        </p>
      </div>
    );

  return (
    <div className="px-4 sm:px-0 max-w-3xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-[#2E2E2E] mb-8 text-center">
        Pesquisas Recentes
      </h2>
      <div className="flex flex-col gap-8">
        {data.map((survey) => {
          const total = survey.yes + survey.no || 1;
          const yesPercent = (survey.yes / total) * 100;
          const noPercent = (survey.no / total) * 100;

          return (
            <div
              key={survey._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-[#4A4A4A] max-w-[70%]">
                  {survey.subject}
                </h3>
                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {formatDateTime(survey.dateSent)}
                </span>
              </div>

              <p className="text-[#555] mb-4">{survey.body}</p>

              {/* Barra de proporção */}
              <div className="mb-3">
                <div className="flex justify-between text-sm font-medium mb-1 px-1">
                  <span className="text-[#6C9BCF]">Sim: {survey.yes}</span>
                  <span className="text-[#D06079]">Não: {survey.no}</span>
                </div>
                <div className="flex h-4 w-full rounded-full overflow-hidden bg-gray-100 border border-gray-300">
                  <div
                    className="bg-[#6C9BCF] h-full"
                    style={{ width: `${yesPercent}%` }}
                  />
                  <div
                    className="bg-[#D06079] h-full"
                    style={{ width: `${noPercent}%` }}
                  />
                </div>
              </div>

              {survey.lastResponded && (
                <p className="mt-2 text-sm text-gray-500 italic">
                  Última resposta: {formatDateTime(survey.lastResponded)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
