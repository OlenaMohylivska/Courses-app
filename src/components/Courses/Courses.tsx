import React, { useState, ChangeEvent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchBar } from './components/SearchBar';
import { CourseCard } from './components/CourseCard';
import { Button } from '../../common/Button';
import { ICourse, IAuthor } from '../../helpers/interfaces';
import { BUTTON_TEXT_ADD_NEW_COURSE } from '../../constants';
import { ROUTES } from '../../routes';
import { getAuthorsName } from '../../helpers/getAuthorsName';

import styles from './Courses.module.scss';

type Props = {
  allCourses: ICourse[];
  allAuthors: IAuthor[];
};

export const Courses: React.FC<Props> = ({ allCourses, allAuthors }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const courses = useMemo(() => {
    const coursesList = allCourses.map((item) => ({
      ...item,
      authorsNames: getAuthorsName(allAuthors, item.authors),
    }));
    return searchValue
      ? coursesList.filter((course) => {
          return (
            course.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            course.id.toLowerCase().includes(searchValue.toLowerCase())
          );
        })
      : coursesList;
  }, [allCourses, searchValue, allAuthors]);

  return (
    <div>
      <SearchBar
        value={searchValue}
        handleInputChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(event.target.value)
        }
      />
      <div className={styles.button}>
        <Button onClick={() => navigate(ROUTES.ADD_COURSE)}>
          {BUTTON_TEXT_ADD_NEW_COURSE}
        </Button>
      </div>
      {courses.map((course) => {
        return <CourseCard key={course.id} course={course} />;
      })}
    </div>
  );
};
