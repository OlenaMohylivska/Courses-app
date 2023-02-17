import React from 'react';

import { Button } from '../../../../common/Button';

import styles from './AuthorItem.module.scss';

type Props = {
  authorName: string;
  buttonText: string;
  onBtnClick: () => void;
};

export const AuthorItem: React.FC<Props> = ({
  authorName,
  buttonText,
  onBtnClick,
}) => {
  return (
    <div className={styles.container}>
      <span>{authorName}</span>
      <Button onClick={onBtnClick}>{buttonText}</Button>
    </div>
  );
};
