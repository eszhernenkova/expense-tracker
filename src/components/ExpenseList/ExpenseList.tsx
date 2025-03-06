import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store/store';
import { addExpense, removeExpense } from '../../store/expenseSlice'

import styles from './ExpenseList.module.scss'
import Input from "../Input/Input";
import Button from "../Button/Button";
import ExpenseCharts from '../Charts/ExpneseCharts'

const ExpenseList: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const dispatch = useDispatch();

  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const categories = ["Продукты", "Транспорт", "Личные покупки", "Развлечения", "Сладкое", "Обязательные платежи"];

   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const filteredExpenses = category
    ? expenses.filter((expense) => expense.category === category)
    : expenses;


  const handleAddExpense = () => {
    if (!source || !amount || !category) return;
    dispatch(addExpense({ id: Date.now().toString(), source, amount: Number(amount), category }));
    setSource("");
    setAmount("");
    setCategory("");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    handleAddExpense();
};

  return (
    <div className={styles.expenses}>
        <form className={styles.form} onSubmit={handleFormSubmit} >
            <Input type="text" placeholder="Источник" value={source} onChange={(e) => setSource((e.target as HTMLInputElement).value)} />
            <Input type="number" placeholder="Сумма" value={amount} onChange={(e) => setAmount((e.target as HTMLInputElement).value)} />
            <div className={styles.categorySelector}>
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">Все категории</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                            {cat}
                    </option>
                ))}
                </select>
            </div>
            <Button appearence="big" type="submit" >Добавить расход</Button>
        </form>
        <div className={styles["expense-list"]}>
            <ul className={styles.list}>
                {expenses.map((expense) => (
                <li key={expense.id}>
                    {expense.source} - {expense.amount} руб. ({expense.category})
                    <Button onClick={() => dispatch(removeExpense(expense.id))}>Удалить</Button>
                </li>
                ))}
            </ul>
        </div>
         <ExpenseCharts expenses={filteredExpenses} />
    </div>
  );
};

export default ExpenseList;
