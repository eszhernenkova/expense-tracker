import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState, saveState } from "./storage";

interface Income {
  id: string;
  source: string;
  amount: number;
  category: string;
}

interface IncomeState {
  incomes: Income[];
}

const LOCAL_STORAGE_KEY = "incomes";

const initialState: IncomeState = {
  incomes:  loadState<Income[]>(LOCAL_STORAGE_KEY) ?? [],
};

const incomeSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<Income>) => {
      state.incomes.push(action.payload);
      saveState(state.incomes, LOCAL_STORAGE_KEY);
    },
    removeIncome: (state, action: PayloadAction<string>) => {
      state.incomes = state.incomes.filter((inc) => inc.id !== action.payload);
      saveState(state.incomes, LOCAL_STORAGE_KEY);
    },
  },
});

export const { addIncome, removeIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
