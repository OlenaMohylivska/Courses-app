import { createSlice } from '@reduxjs/toolkit';

import { loading, rejected, resolved } from '../../constants';
import { ICourse, IStatus } from '../../helpers/interfaces';
import {
  deleteCourse,
  fetchCourses,
  postCourse,
  updateCourse,
} from '../../services';

export interface ICoursesInitialState extends IStatus {
  courses: ICourse[];
}

export const initialState: ICoursesInitialState = {
  courses: [],
  status: '',
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    getCourses: (state, action) => {
      state.courses.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = loading;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses.push(...action.payload);
        state.status = resolved;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = rejected;
      })
      .addCase(postCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
        state.status = resolved;
      })
      .addCase(postCourse.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = rejected;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.courses.splice(
          state.courses.findIndex((item) => action.payload.id === item.id),
          1,
          action.payload
        );
        state.status = resolved;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = rejected;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          (item) => action.payload !== item.id
        );
        state.status = resolved;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = rejected;
      });
  },
});

export default coursesSlice.reducer;

export const { getCourses } = coursesSlice.actions;
