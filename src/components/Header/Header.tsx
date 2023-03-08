import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button';
import { BUTTON_TEXT_LOGOUT } from '../../constants';
import { ROUTES } from '../../routes';

import { resetAll, store, useAppDispatch } from '../../store';
import { logout } from '../../services';
import { IUserState } from '../../helpers/interfaces';

import styles from './Header.module.scss';

type Props = {
  user: IUserState;
};

export const Header: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    dispatch(logout());
    store.dispatch(resetAll());
    localStorage.clear();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className={styles.container}>
      <Link to={ROUTES.COURSES}>
        <Logo />
      </Link>

      {localStorage.getItem('userToken') && location.pathname !== ROUTES.LOGIN && (
        <div className={styles.actions}>
          <h4 className={styles.userName}>{user.name}</h4>
          <Button onClick={logoutHandler}>{BUTTON_TEXT_LOGOUT}</Button>
        </div>
      )}
    </div>
  );
};
