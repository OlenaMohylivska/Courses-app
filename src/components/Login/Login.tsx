import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ILogin, IUserState } from '../../helpers/interfaces';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button/Button';
import { ROUTES } from '../../routes';
import { useAppDispatch, useAppSelector } from '../../store';
import { login } from '../../services';
import { getUserError, getUser } from '../../store/user/selectors';
import { resetUserError } from '../../store/user/userSlice';

import styles from './Login.module.scss';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth }: IUserState = useAppSelector(getUser);
  const [loginInfo, setLoginInfo] = useState<ILogin>({
    email: '',
    password: '',
  });
  const loginError = useAppSelector(getUserError);
  const navigate = useNavigate();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTES.COURSES, { replace: true });
    }

    return () => {
      if (loginError) dispatch(resetUserError());
    };
  }, [isAuth, navigate]);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(login(loginInfo));
      }}
    >
      <h2 className={styles.header}>Login</h2>
      <Input
        value={loginInfo.email}
        placeholderText="Enter email"
        inputType="email"
        label="Email"
        name="email"
        onChange={handleInputChange}
      />
      <Input
        value={loginInfo.password}
        placeholderText="Enter password"
        inputType="password"
        label="Password"
        name="password"
        onChange={handleInputChange}
      />
      <div className={styles.buttonContainer}>
        <Button>Login</Button>
      </div>
      <div className={styles.loginBlock}>
        <span>If you don&apos;t have an account you can </span>
        <Link className={styles.link} replace to={ROUTES.REGISTRATION}>
          Registration
        </Link>
        {loginError && <p>Sorry, Sign in failed!</p>}
      </div>
    </form>
  );
};
