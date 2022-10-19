import React from 'react';
import { Button as ButtonMui } from '@mui/material';

import styles from './Button.module.scss';

type Props = {
  text: string;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
};

export const Button: React.FC<Props> = ({ text, onClick }) => (
  <ButtonMui
    variant="outlined"
    color="secondary"
    classes={{ root: styles.button }}
    onClick={onClick}
    type="submit"
  >
    {text}
  </ButtonMui>
);
