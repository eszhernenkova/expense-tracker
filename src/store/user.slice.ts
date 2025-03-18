import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

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

// асинхронный запрос для логина
export const loginUser = createAsyncThunk<
  { token: string } | undefined,  // ожидание ответа с токеном
  { email: string; password: string }
>(
  'user/login',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<{ token: string }>('https://reqres.in/api/login', params);
      return data; // Ожидаем { token: "QpwL5tke4Pnpja7X4" }
    } catch (e) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data?.error || "Ошибка авторизации");
      }
      return rejectWithValue("Неизвестная ошибка");
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
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string } | undefined>) => {
        if (action.payload) {
          state.token = action.payload.token; // сохранить токен
          localStorage.setItem("token", action.payload.token); // записать в localStorage
        } else {
          state.error = "Ошибка при авторизации";
        }
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
