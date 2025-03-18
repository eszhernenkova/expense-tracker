import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { LoginResponse } from "../interfaces/auth.interface";  // Импортируем тип LoginResponse

interface UserState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  token: null,
  loading: false,
  error: null,
};

// Асинхронный запрос для логина
export const loginUser = createAsyncThunk<
  LoginResponse | undefined,  
  { username: string; password: string }
>(
  'user/login',
  async (params: { username: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>('https://freefakeapi.io/authapi/login', {
        username: params.username,
        password: params.password
      });
      return data;  // возвращаем LoginResponse
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
      return undefined;  // при ошибке возвращаем undefined
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse | undefined>) => {
          if (action.payload) {
            // проверка, что payload не undefined
            state.token = action.payload.token; 
          } else {
            state.error = "Ошибка при авторизации";  // Обрабатываем ошибку, если payload = undefined
          }
          state.loading = false;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;  // Ошибка из rejected
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
