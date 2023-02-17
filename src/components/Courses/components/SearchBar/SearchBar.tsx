import React, { EventHandler, FormEvent } from 'react';

import { Input } from '../../../../common/Input';

import styles from './SearchBar.module.scss';

type Props = {
  handleInputChange: EventHandler<FormEvent>;
  value: string;
};

export const SearchBar: React.FC<Props> = ({ value, handleInputChange }) => {
  return (
    <div className={styles.container}>
      <Input
        placeholderText="Enter course name or id..."
        value={value}
        onChange={handleInputChange}
        inputType="search"
      />
    </div>
  );
};
