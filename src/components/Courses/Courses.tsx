import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchBar } from './components/SearchBar';
import { CourseCard } from './components/CourseCard';
import { Button } from '../../common/Button';
import { ICourse } from '../../helpers/interfaces';
import { BUTTON_TEXT_ADD_NEW_COURSE } from '../../constants';
import { ROUTES } from '../../routes';

import styles from './Courses.module.scss';

type Props = {
  fullCoursesData: ICourse[];
};

export const Courses: React.FC<Props> = ({ fullCoursesData }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<ICourse[]>(fullCoursesData);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!searchValue) {
      setCourses(fullCoursesData);
    }
  }, [searchValue, fullCoursesData]);

  const handleSearchBtn = () => {
    setCourses(
      fullCoursesData.filter((course) => {
        return (
          course.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          course.id.toLowerCase().includes(searchValue.toLowerCase())
        );
      })
    );
  };

  return (
    <div>
      <SearchBar
        value={searchValue}
        handleInputChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(event.target.value)
        }
        handleSearchBtn={handleSearchBtn}
      />
      <div className={styles.button}>
        <Button
          text={BUTTON_TEXT_ADD_NEW_COURSE}
          onClick={() => navigate(ROUTES.ADD_COURSE)}
        />
      </div>
      {courses.map((course) => {
        return <CourseCard key={course.id} course={course} />;
      })}
    </div>
  );
};
