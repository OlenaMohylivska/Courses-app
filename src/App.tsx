import React, { useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Courses } from './components/Courses';
import { CourseForm } from './components/CourseForm';
import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { RequireAuth } from './components/RequireAuth';
import { ROUTES } from './routes';
import { getUser } from './store/user/selectors';
import { getCourses } from './store/courses/selectors';
import { getAuthors } from './store/authors/selectors';
import { ICourse, IAuthor, IUserState } from './helpers/interfaces';
import { useAppDispatch, useAppSelector } from './store';
import { currentUser, fetchAuthors, fetchCourses } from './services';
import { PrivateRoute } from './components/PrivateRouter/PrivateRouter';

import styles from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const allCourses: ICourse[] = useAppSelector(getCourses);
  const allAuthors: IAuthor[] = useAppSelector(getAuthors);
  const user: IUserState = useAppSelector(getUser);

  useEffect(() => {
    if (user.isAuth) {
      dispatch(currentUser());

      if (!allCourses.length) {
        dispatch(fetchCourses());
      }

      if (!allAuthors.length) {
        dispatch(fetchAuthors());
      }
    }
  }, [user.isAuth]);

  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.container}>
        <Header user={user} />
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
                  <Courses
                    allCourses={allCourses}
                    allAuthors={allAuthors}
                    user={user}
                  />
                }
              />

              <Route path={ROUTES.COURSE_ID} element={<CourseInfo />} />

              <Route
                path={ROUTES.ADD_COURSE}
                element={
                  <PrivateRoute user={user}>
                    <CourseForm allAuthors={allAuthors} />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.UPDATE_COURSE}
                element={
                  <PrivateRoute user={user}>
                    <CourseForm allAuthors={allAuthors} />
                  </PrivateRoute>
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
