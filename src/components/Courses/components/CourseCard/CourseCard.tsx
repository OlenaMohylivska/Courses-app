import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
} from '@mui/icons-material';

import { Button } from '../../../../common/Button';
import { admin, BUTTON_TEXT_SHOW_COURSE } from '../../../../constants';
import { ROUTES } from '../../../../routes';
import { ICourse, IUserState } from '../../../../helpers/interfaces';
import { useAppDispatch } from '../../../../store';
import { deleteCourse } from '../../../../services';
import {
  formatCreationDate,
  getCourseDuration,
  parameterReplacer,
} from '../../../../helpers/helpers';

import styles from './CourseCard.module.scss';

type Props = {
  course: ICourse;
  user: IUserState;
};
export const CourseCard: React.FC<Props> = ({ course, user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
              navigate(
                parameterReplacer(ROUTES.COURSE_ID, { courseId: course.id }),
                { state: course }
              )
            }
          >
            {BUTTON_TEXT_SHOW_COURSE}
          </Button>
          {user.role === admin && (
            <>
              <Button
                onClick={() =>
                  navigate(
                    parameterReplacer(ROUTES.UPDATE_COURSE, {
                      courseId: course.id,
                    })
                  )
                }
              >
                <EditOutlinedIcon />
              </Button>
              <Button onClick={() => dispatch(deleteCourse(course.id!))}>
                <DeleteOutlinedIcon />
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
