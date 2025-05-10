import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../types/User";

interface AuthState {
  user: IUser | false;
  loading: boolean;
  loadingMessage: string | false;
}

const initialState: AuthState = {
  user: false,
  loading: false,
  loadingMessage: false,
};

// Busca os dados do usuário atual
export const fetchUsers = createAsyncThunk<IUser>(
  "auth/fetchUsers",
  async () => {
    const response = await axios.get("auth/api/current_user");
    return response.data || false;
  }
);

export const handleToken = createAsyncThunk<
  IUser,
  { token: string; amount: number }
>("token/handleToken", async ({ token, amount }) => {
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
        state.loadingMessage = false;
        state.user = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.loadingMessage = false;
      })
      .addCase(handleToken.pending, (state) => {
        state.loading = true;
        state.loadingMessage = "Processando pagamento...";
      })
      .addCase(handleToken.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMessage = false;
        state.user = action.payload;
      })

      .addCase(handleToken.rejected, (state) => {
        state.loading = false;
        state.loadingMessage = false;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
