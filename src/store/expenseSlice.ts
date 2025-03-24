import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState, saveState } from "./storage";


export interface Expense {
    id: string;
    source: string;
    amount: number;
    category: string;
    // date: Date
}

interface ExpenseState {
    expenses: Expense[]
}
const LOCAL_STORAGE_KEY = "expenses";

const initialState: ExpenseState ={
    expenses: loadState<Expense[]>(LOCAL_STORAGE_KEY) ?? [],
}


const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload);
            saveState(state.expenses, LOCAL_STORAGE_KEY);
        },
        removeExpense: (state, action: PayloadAction<string>) => {
            state.expenses = state.expenses.filter((exp) => exp.id !== action.payload);
            saveState(state.expenses, LOCAL_STORAGE_KEY);
        }
    }
})


export const { addExpense, removeExpense } = expenseSlice.actions;
export default expenseSlice.reducer;