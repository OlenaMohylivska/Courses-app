import React from 'react';
import logo from './logo.jpg';
import './styles.scss';

export const Logo: React.FC = () => {
  return <img className="logo" src={logo} alt="logo" />;
};
