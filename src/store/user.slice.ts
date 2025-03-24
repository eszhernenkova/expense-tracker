import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { loadState } from "./storage";
import { LoginResponse } from "../interfaces/auth.interface";


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

export const loginUser = createAsyncThunk('user/login',
  async (params: {token: string | undefined, email: string, password: string}  ) => {
    try {
      const { data } = await axios.post<LoginResponse>('https://reqres.in/api/login', {
        token: params.token,
        email: params.email,
        password: params.password

      });
      return data; // Ожидаем { token: "QpwL5tke4Pnpja7X4" }
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk('user/register', async( params: {token: string | undefined, email: string, password: string})=> {
  try {
    const { data } = await axios.post<LoginResponse>('https://reqres.in/api/register', {
      token: params.token,
      email: params.email,
      password: params.password

    });
    return data; 
  } catch(e) {
			if( e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
})


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
      .addCase(loginUser.fulfilled, (state, action)=> {
        if(!action.payload) return;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if(!action.payload) return;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const userActions  = userSlice.actions;

export default userSlice.reducer;
