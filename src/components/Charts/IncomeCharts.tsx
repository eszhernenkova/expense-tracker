import { useSelector } from 'react-redux';
import { ExpenseChartsProps } from './ExpenseCharts.props';
import styles from './IncomeCharts.module.scss'
import { RootState } from '../../store/store';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

const COLORS = ['#7EB8DC', '#90DDEA', '#FFA5D8'];

const IncomeCharts: React.FC<ExpenseChartsProps> = () => {
    const incomes = useSelector((state: RootState) => state.incomes.incomes);

    const incomeData = incomes.reduce((acc, income) => {
    const found = acc.find((i) => i.name === income.category);
    if (found) {
      found.value += income.amount;
    } else {
      acc.push({ name: income.category, value: income.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
         <div className={styles.charts}>
        <PieChart width={300} height={300}>
          <Pie data={incomeData} cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" dataKey="value">
            {incomeData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div> 
  )
}

export default IncomeCharts