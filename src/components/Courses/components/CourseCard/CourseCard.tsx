import React from 'react';

import { Button } from '../../../../common/Button';
import { BUTTON_TEXT_SHOW_COURSE } from '../../../../constants';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { formatCreationDate } from '../../../../helpers/formatCreationDate';

import './styles.scss';

type CourseCardProps = {
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string;
};
export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  creationDate,
  duration,
  authors,
}) => {
  return (
    <div className="course-card">
      <div className="course-card-info">
        <h2 className="course-card-info-title">{title}</h2>
        <p className="course-card-info-description">{description}</p>
      </div>
      <div className="course-card-details">
        <p className="authors">
          <span className="course-card-details-title">Authors: </span>
          {authors}
        </p>
        <p className="duration">
          <span className="course-card-details-title">Duration: </span>
          {getCourseDuration(duration)}
        </p>
        <p className="created">
          <span className="course-card-details-title">Created: </span>
          {formatCreationDate(creationDate)}
        </p>
        <div className="btn-show-course">
          <Button
            buttonText={BUTTON_TEXT_SHOW_COURSE}
            onClick={() => console.log('course')}
          />
        </div>
      </div>
    </div>
  );
};
