import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../types/User";

interface AuthState {
  user: IUser | false;
  loading: boolean;
}

const initialState: AuthState = {
  user: false,
  loading: false,
};

//busca os dados do usuário atual
export const fetchUsers = createAsyncThunk<IUser>(
  "auth/fetchUsers",
  async () => {
    const response = await axios.get("auth/api/current_user");

    return response.data || false;
  }
);

//generic: retorna uma string, recebe uma string e number de parâmetro
export const handleToken = createAsyncThunk<
  string,
  { token: string; amount: number }
>("token/handleToken", async ({ token, amount }) => {
  const response = await axios.post("pay/stripe", { token, amount });

  console.log(response.data);
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
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(handleToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleToken.fulfilled, (state) => {
        state.loading = false;
        // Você pode atualizar algo aqui se necessário
        // Ex: state.user.credits += x; se for retornado isso
      })
      .addCase(handleToken.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
