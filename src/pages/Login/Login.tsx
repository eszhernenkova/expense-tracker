import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling"
import Input from "../../components/Input/Input"

import styles from './Login.module.scss'
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../store/user.slice";


function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState)=> state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate("/");  // переброс на главную после успешного входа
    }
  };


  return (
    <div className={styles.container}>
      <Headling>Вход</Headling>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
				    <Input id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)}/>
				</div>

				<div className={styles.field}>
				    <Input id="password" type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword((e.target as HTMLInputElement).value)} />
				</div>
        {error && <p className={styles.error}>{error}</p>}
        <Button appearence="big" type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Войти"}
        </Button>
      </form>
    </div>
  );
}

export default Login;