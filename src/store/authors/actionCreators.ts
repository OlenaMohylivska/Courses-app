import { createAction } from '@reduxjs/toolkit';

import { IAuthor } from '../../helpers/interfaces';
import { ADD_AUTHOR, GET_AUTHORS, CLEAN_AUTHORS } from './actionTypes';

export const getAuthors = createAction<IAuthor[]>(GET_AUTHORS);
export const addAuthor = createAction<IAuthor>(ADD_AUTHOR);
export const cleanAuthors = createAction(CLEAN_AUTHORS);
