import React, { ChangeEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { IUser } from '../../helpers/interfaces';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button/Button';
import { ROUTES } from '../../routes';
import { register } from '../../services';
import { useAppDispatch, useAppSelector } from '../../store';
import { getUserError } from '../../store/user/selectors';
import { resetUserError } from '../../store/user/userSlice';

import styles from './Registration.module.scss';

export const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const [newUser, setNewUser] = useState<IUser>({
    name: '',
    email: '',
    password: '',
  });

  const registerError = useAppSelector(getUserError);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (registerError) dispatch(resetUserError());
    };
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const createUser = () => {
    dispatch(register(newUser)).then((response) => {
      if (response.payload) {
        navigate(ROUTES.LOGIN, { replace: true });
      }
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
        {registerError && <p>Sorry, Sign up failed!</p>}
      </div>
    </form>
  );
};
