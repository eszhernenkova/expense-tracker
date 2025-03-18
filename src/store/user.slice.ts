import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { loadState } from "./storage";


export const JWT_PERSISTENT_STATE = 'userData';
interface UserState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.token ?? null
};

export interface UserPersistentState {
  token: string | null;
}

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
      // .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string } | undefined>) => {
      //   if (action.payload) {
      //     state.token = action.payload.token; // сохранить токен
      //   } else {
      //     state.error = "Ошибка при авторизации";
      //   }
      //   state.loading = false;
      // })
      .addCase(loginUser.fulfilled, (state, action)=> {
        if(!action.payload) return;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
