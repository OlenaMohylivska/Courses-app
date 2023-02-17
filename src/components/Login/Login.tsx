import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { ILogin } from '../../helpers/interfaces';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button/Button';
import { ROUTES } from '../../routes';
import { logIn } from '../../store/user/actionCreators';

import styles from './Login.module.scss';

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL;

export const Login: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<ILogin>({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const [hasError, setError] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
  };

  const toLogin = () => {
    axios
      .post(`${baseUrl}/login`, loginInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.data.successful) {
          localStorage.setItem('userToken', response.data.result);

          const userInfo = {
            isAuth: true,
            name: response.data.user.name,
            email: response.data.user.email,
            token: response.data.result,
          };

          dispatch(logIn(userInfo));
          navigate(ROUTES.COURSES, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        toLogin();
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
        {hasError && <p>Sorry, Sign in failed!</p>}
      </div>
    </form>
  );
};
