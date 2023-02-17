import { createAction } from '@reduxjs/toolkit';

import { ICourse } from '../../helpers/interfaces';
import {
  GET_COURSES,
  ADD_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  CLEAN_COURSES,
} from './actionTypes';

export const getCourses = createAction<ICourse[]>(GET_COURSES);
export const addCourse = createAction<ICourse>(ADD_COURSE);
export const updateCourse = createAction<ICourse>(UPDATE_COURSE);
export const deleteCourse = createAction<string>(DELETE_COURSE);
export const cleanCourses = createAction(CLEAN_COURSES);
