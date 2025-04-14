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

    console.log("Dados da resposta (response.data):", response.data);
    return response.data || false;
  }
);

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
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
