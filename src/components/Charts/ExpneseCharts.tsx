
import { useSelector } from "react-redux";
import { RootState } from '../../store/store';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { ExpenseChartsProps } from './ExpenseCharts.props';


import styles from './ExpneseCharts.module.scss'

const COLORS = ['#7EB8DC', '#90DDEA', '#FFA5D8', '#BF9DDF', '#957AD0', '#D562BE'];

const ExpneseCharts: React.FC<ExpenseChartsProps> = () => {
  const expenses = useSelector((state: RootState) => state.expenses.expenses);

  const expenseData = expenses.reduce<{ name: string; value: number }[]>((acc, expense) => {
    const found = acc.find((e) => e.name === expense.category);
    if (found) {
      found.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);



  return (
    <div className={styles.charts}>
      <div>
        <PieChart width={300} height={300}>
          <Pie data={expenseData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
            {expenseData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default ExpneseCharts;
