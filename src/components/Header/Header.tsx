import React from 'react';
import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button';
import { BUTTON_TEXT_LOGOUT } from '../../constants';
import './styles.scss';

export const Header: React.FC = () => {
  const logoutHandler = () => {
    console.log('logout');
  };
  return (
    <div className="header">
      <Logo />
      <div className="header-actions">
        <h4 className="user-name">Olena</h4>
        <Button buttonText={BUTTON_TEXT_LOGOUT} onClick={logoutHandler} />
      </div>
    </div>
  );
};
