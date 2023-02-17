import { createAction } from '@reduxjs/toolkit';

import { LOGGED_IN, LOGGED_OUT } from './actionTypes';
import { IUserState } from '../../helpers/interfaces';

export const logIn = createAction<IUserState>(LOGGED_IN);
export const logOut = createAction(LOGGED_OUT);
