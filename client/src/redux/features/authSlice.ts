import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../types/User";
//retorna os dados do user atualizado/
import { submitSurvey } from "./surveySlice";

interface AuthState {
  user: IUser | null;
  loading: boolean;
  loadingMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  loadingMessage: null,
};

export const fetchUsers = createAsyncThunk<IUser | null>(
  "auth/fetchUsers",
  async () => {
    const response = await axios.get("auth/api/current_user");
    return response.data || null;
  }
);

export const handleToken = createAsyncThunk<
  IUser,
  { token: string; amount: number }
>("auth/handleToken", async ({ token, amount }) => {
  const response = await axios.post("pay/stripe", { token, amount });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.loadingMessage = "Buscando informações do usuário...";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMessage = null;
        state.user = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.loadingMessage = null;
      })
      .addCase(handleToken.pending, (state) => {
        state.loading = true;
        state.loadingMessage = "Processando pagamento...";
      })
      .addCase(handleToken.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMessage = null;
        state.user = action.payload;
      })
      .addCase(handleToken.rejected, (state) => {
        state.loading = false;
        state.loadingMessage = null;
      })
      // integração com o outro redux (survey) retorna user atualizado.
      .addCase(submitSurvey.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
