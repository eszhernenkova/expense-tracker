import { Outlet } from "react-router-dom"

import styles from './Layout.module.scss'

function Layout() {
  return (
    <div className={styles.content}>
			<Outlet />
		</div>
  )
}

export default Layout