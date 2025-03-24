

// import { useSelector } from "react-redux"
import { useDispatch, useSelector } from "react-redux"
import ExpenseList from "../../components/ExpenseList/ExpenseList"
import Headling from "../../components/Headling/Headling"
import IncomeList from "../../components/IncomeList/IncomeList"

import styles from './Home.module.scss'
import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react"
import Button from "../../components/Button/Button"
import { userActions } from '../../store/user.slice'



const Home: React.FC = () =>{
  const { token } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!token) {
      navigate("/authapi/login");  // если нет токена - на страницу логина
    }
  }, [token, navigate]);

  const logout = () => {
    dispatch(userActions.logout())
    navigate("/authapi/login");
  }
  return (
    <div className={styles.conteiner}>
      <div className={styles.header}> 
        <Headling>Домашняя страница</Headling>
        <Button onClick={logout} appearence="big">Выход</Button>
      </div>

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