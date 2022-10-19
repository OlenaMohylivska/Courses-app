import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button';
import { BUTTON_TEXT_LOGOUT } from '../../constants';
import { ROUTES } from '../../routes';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
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
          <h4 className={styles.userName}>
            {localStorage.getItem('userName')}
          </h4>
          <Button text={BUTTON_TEXT_LOGOUT} onClick={logoutHandler} />
        </div>
      )}
    </div>
  );
};
