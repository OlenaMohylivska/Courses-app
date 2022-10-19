import React, { useState, useMemo } from 'react';
import { StyledEngineProvider } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Courses } from './components/Courses';
import { mockedCoursesList, mockedAuthorsList } from './constants';
import { CreateCourse } from './components/CreateCourse';
import { ICourse, IAuthor } from './helpers/interfaces';
import { ROUTES } from './routes';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { RequireAuth } from './components/RequireAuth';

import styles from './App.module.scss';

const App: React.FC = () => {
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
    <StyledEngineProvider injectFirst>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />

            <Route path={ROUTES.REGISTRATION} element={<Registration />} />
            <Route element={<RequireAuth />}>
              <Route
                path={ROUTES.HOME}
                element={<Navigate replace to={ROUTES.LOGIN} />}
              />

              <Route
                path={ROUTES.COURSES}
                element={<Courses fullCoursesData={fullCoursesData} />}
              />

              <Route
                path={ROUTES.COURSE_ID}
                element={<CourseInfo fullCoursesData={fullCoursesData} />}
              />
              <Route
                path={ROUTES.ADD_COURSE}
                element={
                  <CreateCourse
                    coursesList={coursesList}
                    setCoursesList={setCoursesList}
                    setAuthorsList={setAuthorsList}
                    authorsList={authorsList}
                  />
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default App;
