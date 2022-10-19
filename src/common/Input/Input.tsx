import React, { ChangeEvent } from 'react';
import { TextField, FormLabel } from '@mui/material';

import styles from './Input.module.scss';

type Props = {
  placeholderText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  inputType: string;
  label?: string;
  name?: string;
};

export const Input: React.FC<Props> = ({
  placeholderText,
  onChange,
  value,
  inputType,
  label,
  name,
}) => {
  return (
    <div className={styles.input}>
      <FormLabel htmlFor="input" classes={{ root: styles.formLabel }}>
        {label}
      </FormLabel>
      <TextField
        id="input"
        value={value}
        type={inputType}
        placeholder={placeholderText}
        color="warning"
        classes={{
          root: styles.formControl,
        }}
        onChange={onChange}
        name={name}
        fullWidth
      />
    </div>
  );
};
