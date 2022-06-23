import React, { ChangeEvent } from 'react';
import { TextareaAutosize, FormLabel } from '@mui/material';

type TextAreaProps = {
  placeholder: string;
  label?: string;
  textAreaValue: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
};

export const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  label,
  textAreaValue,
  onChange,
  name,
}) => {
  return (
    <>
      <FormLabel htmlFor="textareaa" sx={{ display: 'block' }}>
        {label}
      </FormLabel>
      <TextareaAutosize
        id="textarea"
        minRows={5}
        placeholder={placeholder}
        value={textAreaValue}
        onChange={onChange}
        name={name}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          border: '2px solid yellow',
        }}
      />
    </>
  );
};
