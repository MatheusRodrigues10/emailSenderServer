import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

//Dados recebidos pela pesquisa em array
export interface Survey {
  _id: string;
  subject: string;
  body: string;
  yes: number;
  no: number;
  _user: string;
  dateSent: string;
  lastResponded?: string;
}

interface SurveyState {
  data: Survey[];
  loading: boolean;
  error: string | null;
}

const initialState: SurveyState = {
  data: [],
  loading: false,
  error: null,
};

// 3. Thunk para buscar os dados
export const fetchSurveyData = createAsyncThunk(
  "surveyData/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Survey[]>("/survey/data");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.error || "Erro ao buscar os dados da pesquisa."
      );
    }
  }
);

// 4. Slice Redux Toolkit
const surveyDataSlice = createSlice({
  name: "surveyData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSurveyData.fulfilled,
        (state, action: PayloadAction<Survey[]>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchSurveyData.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default surveyDataSlice.reducer;
