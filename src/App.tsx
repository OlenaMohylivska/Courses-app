import React, { useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from './components/Header/Header';
import { Courses } from './components/Courses';
import { CreateCourse } from './components/CreateCourse';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { RequireAuth } from './components/RequireAuth';
import { ROUTES } from './routes';
import { fetchCoursesList, getAllAuthors } from './services';
import { getUser } from './store/user/selectors';
import { getCourses } from './store/courses/selectors';
import { getAuthors } from './store/authors/selectors';
import { ICourse, IAuthor, IUserState } from './helpers/interfaces';

import styles from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const allCourses: ICourse[] = useSelector(getCourses);
  const allAuthors: IAuthor[] = useSelector(getAuthors);
  const user: IUserState = useSelector(getUser);

  useEffect(() => {
    if (user.isAuth) {
      if (!allCourses.length) {
        fetchCoursesList(dispatch);
      }

      if (!allAuthors.length) {
        getAllAuthors(dispatch);
      }
    }
  }, [user.isAuth]);

  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.container}>
        <Header userName={user.name} />
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
                element={
                  <Courses allCourses={allCourses} allAuthors={allAuthors} />
                }
              />

              <Route path={ROUTES.COURSE_ID} element={<CourseInfo />} />
              <Route
                path={ROUTES.ADD_COURSE}
                element={<CreateCourse allAuthors={allAuthors} />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default App;
