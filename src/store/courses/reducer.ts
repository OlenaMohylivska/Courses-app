import { createReducer } from '@reduxjs/toolkit';
import { ICourse } from '../../helpers/interfaces';
import {
  addCourse,
  cleanCourses,
  deleteCourse,
  getCourses,
  updateCourse,
} from './actionCreators';

const coursesInitialState: ICourse[] = [];

export const coursesReducer = createReducer(coursesInitialState, (builder) => {
  builder
    .addCase(getCourses, (state, action) => action.payload)
    .addCase(addCourse, (state, action) => [...state, action.payload])
    .addCase(updateCourse, (state, action) => [...state, action.payload])
    .addCase(deleteCourse, (state, action) =>
      state.filter((item) => action.payload !== item.id)
    )
    .addCase(cleanCourses, () => coursesInitialState)
    .addDefaultCase((state) => state);
});
