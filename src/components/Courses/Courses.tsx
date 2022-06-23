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

import './styles.scss';

type CoursesProps = {
  fullCoursesData: ICourse[];
  setIsCreateCourse: Dispatch<SetStateAction<boolean>>;
};

export const Courses: React.FC<CoursesProps> = ({
  fullCoursesData,
  setIsCreateCourse,
}) => {
  const [courses, setCourses] = useState<ICourse[]>(fullCoursesData);

  const [enteredText, setEnteredText] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(event.target.value);
  };

  useEffect(() => {
    if (!enteredText) {
      setCourses(fullCoursesData);
    }
  }, [enteredText, fullCoursesData]);

  const handleSearchBtn = () => {
    setCourses(
      fullCoursesData.filter((course) => {
        return (
          course.title.toLowerCase().includes(enteredText.toLowerCase()) ||
          course.id.toLowerCase().includes(enteredText.toLowerCase())
        );
      })
    );
  };

  return (
    <div className="courses">
      <SearchBar
        enteredText={enteredText}
        handleInputChange={handleInputChange}
        handleSearchBtn={handleSearchBtn}
      />
      <div className="add-course-btn">
        <Button
          buttonText={BUTTON_TEXT_ADD_NEW_COURSE}
          onClick={() => setIsCreateCourse(true)}
        />
      </div>
      {courses.map((courseList) => {
        return (
          <CourseCard
            key={courseList.id}
            title={courseList.title}
            description={courseList.description}
            creationDate={courseList.creationDate}
            duration={courseList.duration}
            authors={courseList.authors.join(', ')}
          />
        );
      })}
    </div>
  );
};
