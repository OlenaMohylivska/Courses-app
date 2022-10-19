import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../common/Button';
import { BUTTON_TEXT_SHOW_COURSE } from '../../../../constants';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { ROUTES } from '../../../../routes';
import { ICourse } from '../../../../helpers/interfaces';

import styles from './CourseCard.module.scss';

type Props = {
  course: ICourse;
};
export const CourseCard: React.FC<Props> = ({ course }) => {
  const navigate = useNavigate();
  return (
    <section className={styles.card}>
      <div className={styles.info}>
        <h2 className={styles.title}>{course.title}</h2>
        <p>{course.description}</p>
      </div>
      <div className={styles.details}>
        <p className={styles.authors}>
          <span className={styles.detailsTitle}>Authors: </span>
          {course.authors.join(', ')}
        </p>
        <p>
          <span className={styles.detailsTitle}>Duration: </span>
          {getCourseDuration(course.duration)}
        </p>
        <p>
          <span className={styles.detailsTitle}>Created: </span>
          {formatCreationDate(course.creationDate)}
        </p>
        <div className={styles.buttonContainer}>
          <Button
            text={BUTTON_TEXT_SHOW_COURSE}
            onClick={() => navigate(`${ROUTES.COURSES}/${course.id}`)}
          />
        </div>
      </div>
    </section>
  );
};
