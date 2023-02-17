import React, { ReactNode } from 'react';
import { Button as ButtonMui } from '@mui/material';

import styles from './Button.module.scss';

type Props = {
  children: ReactNode | string;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
};

export const Button: React.FC<Props> = ({ children, onClick }) => (
  <ButtonMui
    variant="outlined"
    color="secondary"
    classes={{ root: styles.button }}
    onClick={onClick}
    type="submit"
  >
    {children}
  </ButtonMui>
);
