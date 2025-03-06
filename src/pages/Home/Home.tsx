

import ExpenseList from "../../components/ExpenseList/ExpenseList"
import Headling from "../../components/Headling/Headling"

import styles from './Home.module.scss'


function Home() {
  return (
    <div className={styles.conteiner}>
        <Headling>Домашняя страница</Headling>
        <div className={styles.wrappper}>
          <div className={styles.expense}>
            <Headling>Расходы</Headling>
            <ExpenseList />
          </div>

        </div>


    </div>
  )
}

export default Home