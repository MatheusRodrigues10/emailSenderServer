import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SurveyState {
  surveyTitle: string;
  subject: string;
  body: string;
  recipients: string;
}

const initialState: SurveyState = {
  surveyTitle: "",
  subject: "",
  body: "",
  recipients: "",
};

// Envia os dados da pesquisa e retorna o user atualizado.
export const submitSurvey = createAsyncThunk(
  "survey/submitSurvey",
  async (surveyData: SurveyState) => {
    const response = await axios.post("/survey", surveyData);
    return response.data;
  }
);

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    //adiciona os dados aos campos
    setSurveyData(state, action: PayloadAction<SurveyState>) {
      return { ...state, ...action.payload };
    },
    //reseta os input da pesquisa
    resetSurvey(state) {
      state.surveyTitle = "";
      state.subject = "";
      state.body = "";
      state.recipients = "";
    },
  },
});

export const { setSurveyData, resetSurvey } = surveySlice.actions;
export default surveySlice.reducer;
