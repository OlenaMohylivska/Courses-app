import {
  combineReducers,
  configureStore,
  createAction,
  PayloadAction,
} from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import userSlice, {
  IUserInitialState,
  initialState as userInitialState,
} from './user/userSlice';
import authorsSlice, {
  IAuthorsInitialState,
  initialState as authorsInitialState,
} from './authors/authorsSlice';
import coursesSlice, {
  ICoursesInitialState,
  initialState as coursesInitialState,
} from './courses/coursesSlice';

export interface IState {
  user: IUserInitialState;
  courses: ICoursesInitialState;
  authors: IAuthorsInitialState;
}
const RESET_ALL = 'RESET_ALL';

export const resetAll = createAction(RESET_ALL);

const rootReducer = combineReducers({
  user: userSlice,
  courses: coursesSlice,
  authors: authorsSlice,
});

const appInitialState = {
  user: userInitialState,
  courses: coursesInitialState,
  authors: authorsInitialState,
};

const appReducer = (
  state: IState | undefined,
  action: PayloadAction<string>
) => {
  if (action.type === RESET_ALL) {
    return appInitialState;
  }

  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: appReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
