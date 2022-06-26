import React, { ChangeEvent } from 'react';
import { TextareaAutosize, FormLabel } from '@mui/material';

import styles from './TextArea.module.scss';

type Props = {
  placeholder: string;
  label?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
};

export const TextArea: React.FC<Props> = ({
  placeholder,
  label,
  value,
  onChange,
  name,
}) => {
  return (
    <>
      <FormLabel className={styles.formLabel} htmlFor="textarea">
        {label}
      </FormLabel>
      <TextareaAutosize
        id="textarea"
        className={styles.textarea}
        minRows={5}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </>
  );
};
