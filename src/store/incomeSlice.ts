import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Income {
  id: string;
  source: string;
  amount: number;
  category: string;
}

interface IncomeState {
  incomes: Income[];
}

const initialState: IncomeState = {
  incomes: [],
};

const incomeSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<Income>) => {
      state.incomes.push(action.payload);
    },
    removeIncome: (state, action: PayloadAction<string>) => {
      state.incomes = state.incomes.filter((inc) => inc.id !== action.payload);
    },
  },
});

export const { addIncome, removeIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
