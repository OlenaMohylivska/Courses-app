import React, { EventHandler, FormEvent } from 'react';

import { Input } from '../../../../common/Input';
import { Button } from '../../../../common/Button';
import { BUTTON_TEXT_SEARCH } from '../../../../constants';

import styles from './SearchBar.module.scss';

type Props = {
  handleInputChange: EventHandler<FormEvent>;
  value: string;
  handleSearchBtn: () => void;
};

export const SearchBar: React.FC<Props> = ({
  value,
  handleInputChange,
  handleSearchBtn,
}) => {
  return (
    <div className={styles.container}>
      <Input
        placeholderText="Enter course name or id..."
        value={value}
        onChange={handleInputChange}
        inputType="search"
      />
      <Button text={BUTTON_TEXT_SEARCH} onClick={handleSearchBtn} />
    </div>
  );
};
