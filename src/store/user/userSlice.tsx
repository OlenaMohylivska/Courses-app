import { createSlice } from '@reduxjs/toolkit';

import { loading, rejected, resolved, user } from '../../constants';
import { IStatus, IUserState } from '../../helpers/interfaces';
import { currentUser, login, logout, register } from '../../services';

export interface IUserInitialState extends IStatus {
  user: IUserState;
}

export const initialState: IUserInitialState = {
  user: { isAuth: false, name: '', email: '', token: '', role: '' },
  status: '',
  error: null,
};

const userSlice = createSlice({
  name: user,
  initialState,
  reducers: {
    resetUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.token = action.payload;
        state.user.isAuth = true;
        state.status = resolved;
        localStorage.setItem('userToken', action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = rejected;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = loading;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = resolved;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = rejected;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = loading;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = resolved;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = rejected;
        state.error = action.error.message;
      })
      .addCase(currentUser.pending, (state) => {
        state.status = loading;
      })
      .addCase(
        currentUser.fulfilled,
        (state, { payload: { name, email, role } }) => {
          state.user.name = name;
          state.user.email = email;
          state.user.role = role;
          state.status = resolved;
        }
      )
      .addCase(currentUser.rejected, (state, action) => {
        state.status = rejected;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { resetUserError } = userSlice.actions;
