import React from 'react';
import { Button as ButtonMui } from '@mui/material';

type ButtonProps = {
  buttonText: string;
  onClick: () => void;
  // onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Button: React.FC<ButtonProps> = ({ buttonText, onClick }) => {
  return (
    <ButtonMui
      variant="outlined"
      color="secondary"
      sx={{
        padding: '0 15px',
        height: '30px',
        color: 'black',
        borderRadius: '1px',
        margin: '0 15px',
        textTransform: 'none',
      }}
      onClick={onClick}
      type="submit"
    >
      {buttonText}
    </ButtonMui>
  );
};
