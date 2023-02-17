import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button';
import { BUTTON_TEXT_LOGOUT } from '../../constants';
import { ROUTES } from '../../routes';
import { logOut } from '../../store/user/actionCreators';

import styles from './Header.module.scss';
import { cleanCourses } from '../../store/courses/actionCreators';
import { cleanAuthors } from '../../store/authors/actionCreators';

type Props = {
  userName: string;
};

export const Header: React.FC<Props> = ({ userName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(logOut());
    dispatch(cleanCourses());
    dispatch(cleanAuthors());
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className={styles.container}>
      <Link to={ROUTES.COURSES}>
        <Logo />
      </Link>

      {localStorage.getItem('userToken') && location.pathname !== ROUTES.LOGIN && (
        <div className={styles.actions}>
          <h4 className={styles.userName}>{userName}</h4>
          <Button onClick={logoutHandler}>{BUTTON_TEXT_LOGOUT}</Button>
        </div>
      )}
    </div>
  );
};
