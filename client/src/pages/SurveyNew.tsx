import { useState } from "react";
import SurveyForm from "../components/SurveyForm";
import SurveyFormReview from "../components/SurveyFormReview";

const SurveyNew = () => {
  const [showReview, setShowReview] = useState(false);

  return (
    <div className="px-4 sm:px-0">
      {/*exibi a tela de confirmar envio de pesquisa se for true*/}
      {showReview ? (
        <SurveyFormReview setShowReview={setShowReview} />
      ) : (
        <SurveyForm setShowReview={setShowReview} />
      )}
    </div>
  );
};

export default SurveyNew;
