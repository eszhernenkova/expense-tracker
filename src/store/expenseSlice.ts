import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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

const initialState: ExpenseState ={
    expenses: [],
}

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload);
        },
        removeExpense: (state, action: PayloadAction<string>) => {
            state.expenses = state.expenses.filter((exp) => exp.id !== action.payload);
        }
    }
})


export const { addExpense, removeExpense } = expenseSlice.actions;
export default expenseSlice.reducer;