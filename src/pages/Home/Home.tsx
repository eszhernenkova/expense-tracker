

// import { useSelector } from "react-redux"
import { useSelector } from "react-redux"
import ExpenseList from "../../components/ExpenseList/ExpenseList"
import Headling from "../../components/Headling/Headling"
import IncomeList from "../../components/IncomeList/IncomeList"

import styles from './Home.module.scss'
import { useNavigate } from "react-router-dom"
import { RootState } from "../../store/store"
import { useEffect } from "react"



const Home: React.FC = () =>{
  const { token } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/authapi/login");  // если нет токена - на страницу логина
    }
  }, [token, navigate]);
  return (
    <div className={styles.conteiner}>
        <Headling>Домашняя страница</Headling>
        <div className={styles.wrappper}>
          <div className={styles.expense}>
            <Headling>Расходы</Headling>
            <ExpenseList />
          </div>
          <div className={styles.income}>
            <Headling>Доходы</Headling>
            <IncomeList />
          </div>

        </div>


    </div>
  )
}

export default Home