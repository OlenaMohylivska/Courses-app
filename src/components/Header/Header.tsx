import React from 'react';
import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button';
import { BUTTON_TEXT_LOGOUT } from '../../constants';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const logoutHandler = () => {
    console.log('logout');
  };
  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.actions}>
        <h4 className={styles.userName}>Olena</h4>
        <Button text={BUTTON_TEXT_LOGOUT} onClick={logoutHandler} />
      </div>
    </div>
  );
};
