import Headling from "../../components/Headling/Headling"
import Input from "../../components/Input/Input"

import styles from './Login.module.scss'


function Login() {
  return (
    <div className={styles.container}>
      <Headling>Вход</Headling>
      <form className={styles.form}>
        <div className={styles.field}>
				    <Input id="email" name="email" placeholder="email"/>
				</div>

				<div className={styles.field}>
				    <Input id="password" type="password" name="password" placeholder="password"/>
				</div>
      </form>
    </div>
  );
}

export default Login;