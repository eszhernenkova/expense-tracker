import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store/store';
import { addIncome, removeIncome } from '../../store/incomeSlice'

import styles from './IncomeList.module.scss'
import Input from "../Input/Input";
import Button from "../Button/Button";
import ExpenseCharts from '../Charts/IncomeCharts'

const IncomeList: React.FC = () => {
  const incomes = useSelector((state: RootState) => state.incomes.incomes);
  const dispatch = useDispatch();

  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const categories = ["Основной доход", "Подарок", "Другое"];

   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const filteredIncomes = category
    ? incomes.filter((income) => income.category === category)
    : incomes;


  const handleAddIncome = () => {
    if (!source || !amount || !category) return;
    dispatch(addIncome({ id: Date.now().toString(), source, amount: Number(amount), category }));
    setSource("");
    setAmount("");
    setCategory("");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    handleAddIncome();
};

  return (
    <div className={styles.incomes}>
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
        <ExpenseCharts expenses={filteredIncomes} />
        <div className={styles["incomes-list"]}>
            <ul className={styles.list}>
                {incomes.map((income) => (
                <li key={income.id}>
                    {income.source} - {income.amount} руб. ({income.category})
                    <Button onClick={() => dispatch(removeIncome(income.id))}>Удалить</Button>
                </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default IncomeList;
