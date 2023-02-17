import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import axios from 'axios';

import { getCourses } from './store/courses/actionCreators';
import { getAuthors } from './store/authors/actionCreators';

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL;

export const fetchCoursesList = (dispatch: Dispatch<AnyAction>) => {
  axios(`${baseUrl}/courses/all`).then((response) => {
    if (response.data.successful) {
      dispatch(getCourses(response.data.result));
    }
  });
};

export const getAllAuthors = (dispatch: Dispatch<AnyAction>) => {
  axios(`${baseUrl}/authors/all`).then((response) => {
    if (response.data.successful) {
      dispatch(getAuthors(response.data.result));
    }
  });
};
