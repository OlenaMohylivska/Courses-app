import React, {
  useState,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import { SearchBar } from './components/SearchBar';
import { CourseCard } from './components/CourseCard';
import { Button } from '../../common/Button';
import { ICourse } from '../../helpers/interfaces';
import { BUTTON_TEXT_ADD_NEW_COURSE } from '../../constants';

import styles from './Courses.module.scss';

type Props = {
  fullCoursesData: ICourse[];
  setIsCreateCourse: Dispatch<SetStateAction<boolean>>;
};

export const Courses: React.FC<Props> = ({
  fullCoursesData,
  setIsCreateCourse,
}) => {
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
          onClick={() => setIsCreateCourse(true)}
        />
      </div>
      {courses.map(
        ({ id, title, description, creationDate, duration, authors }) => {
          return (
            <CourseCard
              key={id}
              title={title}
              description={description}
              creationDate={creationDate}
              duration={duration}
              authors={authors.join(', ')}
            />
          );
        }
      )}
    </div>
  );
};
