import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
} from '@mui/icons-material';

import { Button } from '../../../../common/Button';
import { BUTTON_TEXT_SHOW_COURSE } from '../../../../constants';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';
import { ROUTES } from '../../../../routes';
import { ICourse } from '../../../../helpers/interfaces';
import { deleteCourse } from '../../../../store/courses/actionCreators';

import styles from './CourseCard.module.scss';

type Props = {
  course: ICourse;
};
export const CourseCard: React.FC<Props> = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <section className={styles.card}>
      <div className={styles.info}>
        <h2 className={styles.title}>{course.title}</h2>
        <p>{course.description}</p>
      </div>
      <div className={styles.details}>
        <p className={styles.authors}>
          <span className={styles.detailsTitle}>Authors: </span>
          {course.authorsNames?.join(', ')}
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
            onClick={() =>
              navigate(`${ROUTES.COURSES}/${course.id}`, { state: course })
            }
          >
            {BUTTON_TEXT_SHOW_COURSE}
          </Button>
          <Button onClick={() => console.log('editIcon')}>
            <EditOutlinedIcon />
          </Button>
          <Button onClick={() => dispatch(deleteCourse(course.id))}>
            <DeleteOutlinedIcon />
          </Button>
        </div>
      </div>
    </section>
  );
};
