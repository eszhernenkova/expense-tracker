import { configureStore } from '@reduxjs/toolkit';

import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice"
import expenseReducer from './expenseSlice'
import incomeReducer from './incomeSlice'
import { saveState } from './storage';
import axios from 'axios';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export const store = configureStore({
	reducer: {
		user: userSlice,
		expenses: expenseReducer,
		incomes: incomeReducer,
	}
});

store.subscribe(()=>{
	saveState({token: store.getState().user.token}, JWT_PERSISTENT_STATE);

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;