import React from 'react';

import { Button } from '../../../../common/Button';
import { BUTTON_TEXT_SHOW_COURSE } from '../../../../constants';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';

import styles from './CourseCard.module.scss';

type Props = {
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string;
};
export const CourseCard: React.FC<Props> = ({
  title,
  description,
  creationDate,
  duration,
  authors,
}) => {
  return (
    <section className={styles.card}>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.details}>
        <p className={styles.authors}>
          <span className={styles.detailsTitle}>Authors: </span>
          {authors}
        </p>
        <p>
          <span className={styles.detailsTitle}>Duration: </span>
          {getCourseDuration(duration)}
        </p>
        <p>
          <span className={styles.detailsTitle}>Created: </span>
          {formatCreationDate(creationDate)}
        </p>
        <div className={styles.buttonContainer}>
          <Button
            text={BUTTON_TEXT_SHOW_COURSE}
            onClick={() => console.log('course')}
          />
        </div>
      </div>
    </section>
  );
};
