import React from 'react';
import logo from './logo.jpg';

import styles from './Logo.module.scss';

export const Logo: React.FC = () => (
  <img className={styles.container} src={logo} alt="logo" />
);
