import React, { ChangeEvent } from 'react';
import { TextField, FormLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

type InputProps = {
  placeholderText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string | number;
  inputWidth?: string;
  fullWidth?: boolean;
  inputType: string;
  label?: string;
  name?: string;
};

const CustomizedTextField = styled(TextField)`
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;

export const Input: React.FC<InputProps> = ({
  placeholderText,
  onChange,
  inputValue,
  inputWidth = '400px',
  fullWidth = false,
  inputType,
  label,
  name,
}) => {
  const InputStyledProps = {
    style: {
      name: 'InputProps',
      width: fullWidth ? '100%' : inputWidth,
      height: '30px',
      border: '1px solid orange',
      borderRadius: '1px',
    },
  };

  return (
    <>
      <FormLabel htmlFor="input" sx={{ display: 'block' }}>
        {label}
      </FormLabel>
      <CustomizedTextField
        id="input"
        value={inputValue}
        type={inputType}
        placeholder={placeholderText}
        color="warning"
        variant="outlined"
        InputProps={InputStyledProps}
        onChange={onChange}
        fullWidth={fullWidth}
        InputLabelProps={{ required: false }}
        name={name}
      />
    </>
  );
};
