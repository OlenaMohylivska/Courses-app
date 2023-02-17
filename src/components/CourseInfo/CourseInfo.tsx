import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '../../routes';
import { ICourse } from '../../helpers/interfaces';
import { getCourseDuration } from '../../helpers/getCourseDuration';

import styles from './CourseInfo.module.scss';

export const CourseInfo: React.FC = () => {
  const location = useLocation();
  const course = location.state as ICourse;

  return (
    <div className={styles.wrapper}>
      <Link to={ROUTES.COURSES}>&#60; Back to courses</Link>
      {course ? (
        <div className={styles.course}>
          <h2 className={styles.title}>{course.title}</h2>

          <div className={styles.data}>
            <p className={styles.description}>{course.description}</p>

            <div className={styles.details}>
              <p>
                <span className={styles.detailsTitle}>ID: </span>
                {course.id}
              </p>

              <p>
                <span className={styles.detailsTitle}>Duration: </span>
                {getCourseDuration(course.duration)}
              </p>

              <p>
                <span className={styles.detailsTitle}>Created: </span>
                {course.creationDate}
              </p>

              <p>
                <span className={styles.detailsTitle}>Authors: </span>
                {course.authorsNames?.join(', ')}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Course does not exist</p>
      )}
    </div>
  );
};
