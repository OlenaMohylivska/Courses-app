import { IState } from '../index';

export const getUser = (state: IState) => state.user.user;
export const getUserError = (state: IState) => state.user.error;
