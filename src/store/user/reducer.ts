import { createReducer } from '@reduxjs/toolkit';
import { IUserState } from '../../helpers/interfaces';
import { logIn, logOut } from './actionCreators';

const userInitialState: IUserState = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
};

export const userReducer = createReducer(userInitialState, (builder) => {
  builder.addCase(logIn, (state, action) => ({ ...action.payload }));
  builder.addCase(logOut, () => userInitialState);
});
