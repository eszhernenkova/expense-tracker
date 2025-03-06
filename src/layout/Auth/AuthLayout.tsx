import styles from './AuthLayout.module.scss'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className={styles.layout}>
        <div className={styles.logo}>
            <img src="/logo.png" alt="Логотип" />
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
    </div>
  )
}

export default AuthLayout