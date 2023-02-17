import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { IUser } from '../../helpers/interfaces';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button/Button';
import { ROUTES } from '../../routes';

import styles from './Registration.module.scss';

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL;

export const Registration: React.FC = () => {
  const [newUser, setNewUser] = useState<IUser>({
    name: '',
    email: '',
    password: '',
  });

  const [hasError, setError] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const createUser = () => {
    axios
      .post(`${baseUrl}/register`, newUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.data.successful) {
          navigate(ROUTES.LOGIN, { replace: true });
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
        createUser();
      }}
    >
      <h2 className={styles.header}>Registration</h2>
      <Input
        value={newUser.name}
        placeholderText="Enter name"
        inputType="text"
        label="Name"
        name="name"
        onChange={handleInputChange}
      />
      <Input
        value={newUser.email}
        placeholderText="Enter email"
        inputType="email"
        label="Email"
        name="email"
        onChange={handleInputChange}
      />
      <Input
        value={newUser.password}
        placeholderText="Enter password"
        inputType="password"
        label="Password"
        name="password"
        onChange={handleInputChange}
      />
      <div className={styles.buttonContainer}>
        <Button>Registration</Button>
      </div>
      <div className={styles.loginBlock}>
        <span>If you have an account you can </span>
        <Link className={styles.link} replace to={ROUTES.LOGIN}>
          Login
        </Link>
        {hasError && <p>Sorry, Sign up failed!</p>}
      </div>
    </form>
  );
};
