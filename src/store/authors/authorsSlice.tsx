import { createSlice } from '@reduxjs/toolkit';

import { loading, rejected, resolved } from '../../constants';
import { IAuthor, IStatus } from '../../helpers/interfaces';
import { addAuthor, fetchAuthors } from '../../services';

export interface IAuthorsInitialState extends IStatus {
  authors: IAuthor[];
}

export const initialState: IAuthorsInitialState = {
  authors: [],
  status: '',
  error: null,
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    getAuthors: (state, action) => {
      state.authors.push(...action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.status = loading;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.authors.push(...action.payload);
        state.status = resolved;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = rejected;
      })

      .addCase(addAuthor.pending, (state) => {
        state.status = loading;
      })
      .addCase(addAuthor.fulfilled, (state, action) => {
        state.authors.push(action.payload);
        state.status = resolved;
      })
      .addCase(addAuthor.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = rejected;
      });
  },
});

export default authorsSlice.reducer;
export const { getAuthors } = authorsSlice.actions;
