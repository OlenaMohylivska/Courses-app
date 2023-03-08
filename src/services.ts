import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  IAuthor,
  ICourse,
  ILogin,
  IUser,
  IUserCredentials,
} from './helpers/interfaces';

const baseUrl = process.env.REACT_APP_BASE_BACKEND_URL;

export const login = createAsyncThunk<string, ILogin>(
  'user/login',
  async (loginInfo) => {
    const response = await axios.post(`${baseUrl}/login`, loginInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.result;
  }
);

export const currentUser = createAsyncThunk<IUserCredentials>(
  'user/currentUser',
  async () => {
    const response = await axios(`${baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('userToken')}`,
      },
    });

    return response.data.result;
  }
);

export const register = createAsyncThunk<IUser, IUser>(
  'user/register',
  async (user) => {
    const response = await axios.post(`${baseUrl}/register`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.result;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await axios.delete(`${baseUrl}/logout`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('userToken')}`,
    },
  });

  return response.data.result;
});

export const fetchCourses = createAsyncThunk<ICourse[]>(
  'courses/fetchCourses',
  async () => {
    const response = await axios(`${baseUrl}/courses/all`);
    const data = await response.data.result;
    return data;
  }
);

export const fetchAuthors = createAsyncThunk<IAuthor[]>(
  'authors/fetchAuthors',
  async () => {
    const response = await axios(`${baseUrl}/authors/all`);
    const data = await response.data.result;
    return data;
  }
);

export const postCourse = createAsyncThunk<ICourse, ICourse>(
  'courses/postCourse',
  async (course) => {
    const response = await axios.post(`${baseUrl}/courses/add`, course, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('userToken')}`,
      },
    });
    return response.data.result;
  }
);

export const updateCourse = createAsyncThunk<ICourse, ICourse>(
  'courses/updateCourse',
  async (course) => {
    const response = await axios.put(
      `${baseUrl}/courses/${course.id}`,
      course,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('userToken')}`,
        },
      }
    );

    return response.data.result;
  }
);

export const deleteCourse = createAsyncThunk<string, string>(
  'courses/deleteCourse',
  async (id) => {
    const response = await axios.delete(`${baseUrl}/courses/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('userToken')}`,
      },
    });

    return response.data.successful && id;
  }
);

export const addAuthor = createAsyncThunk<IAuthor, IAuthor>(
  'authors/addAuthor',
  async (author) => {
    const response = await axios.post(`${baseUrl}/authors/add`, author, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('userToken')}`,
      },
    });
    return response.data.result;
  }
);
