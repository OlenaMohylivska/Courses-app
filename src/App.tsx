import React, { useState, useMemo } from 'react';

import { Header } from './components/Header/Header';
import { Courses } from './components/Courses';
import { mockedCoursesList, mockedAuthorsList } from './constants';
import { CreateCourse } from './components/CreateCourse';
import { ICourse, IAuthor } from './helpers/interfaces';
import './App.css';

const App: React.FC = () => {
  const [isCreateCourse, setIsCreateCourse] = useState<boolean>(false);
  const [coursesList, setCoursesList] = useState<ICourse[]>(mockedCoursesList);
  const [authorsList, setAuthorsList] = useState<IAuthor[]>(mockedAuthorsList);

  const fullCoursesData = useMemo(() => {
    const authorsMap = authorsList.reduce(
      (acc: { [key: string]: { name: string; id: string } }, curr) => {
        acc[curr.id] = curr;
        return acc;
      },
      {}
    );

    return coursesList.map((course) => {
      return {
        ...course,
        authors: course.authors.map((authorId) => authorsMap[authorId].name),
      };
    });
  }, [coursesList, authorsList]);

  return (
    <>
      <Header />
      {!isCreateCourse ? (
        <Courses
          fullCoursesData={fullCoursesData}
          setIsCreateCourse={setIsCreateCourse}
        />
      ) : (
        <CreateCourse
          coursesList={coursesList}
          setCoursesList={setCoursesList}
          setAuthorsList={setAuthorsList}
          authorsList={authorsList}
          setIsCreateCourse={setIsCreateCourse}
        />
      )}
    </>
  );
};

export default App;
