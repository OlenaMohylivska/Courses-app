import React from 'react';

import { Button } from '../../../../common/Button';

import './styles.scss';

type AuthorItemProps = {
  authorName: string;
  buttonText: string;
  onBtnClick: () => void;
};

export const AuthorItem: React.FC<AuthorItemProps> = ({
  authorName,
  buttonText,
  onBtnClick,
}) => {
  return (
    <div className="author-item">
      <span>{authorName}</span>
      <Button buttonText={buttonText} onClick={onBtnClick} />
    </div>
  );
};
