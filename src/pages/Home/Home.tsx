import Headling from "../../components/Headling/Headling"

import styles from './Home.module.scss'


function Home() {
  return (
    <div className={styles.wrapper}>
        <Headling>Домашняя страница</Headling>

    </div>
  )
}

export default Home