import React, { EventHandler, FormEvent } from 'react';

import { Input } from '../../../../common/Input';
import { Button } from '../../../../common/Button';
import { BUTTON_TEXT_SEARCH } from '../../../../constants';

type SearchBarProps = {
  handleInputChange: EventHandler<FormEvent>;
  enteredText: string;
  handleSearchBtn: () => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  handleInputChange,
  enteredText,
  handleSearchBtn,
}) => {
  return (
    <>
      <Input
        placeholderText="Enter course name or id..."
        inputValue={enteredText}
        onChange={handleInputChange}
        inputWidth="600px"
        inputType="search"
      />
      <Button buttonText={BUTTON_TEXT_SEARCH} onClick={handleSearchBtn} />
    </>
  );
};
