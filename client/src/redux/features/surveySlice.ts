import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setSurveyData(state, action: PayloadAction<SurveyState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSurveyData } = surveySlice.actions;
export default surveySlice.reducer;
