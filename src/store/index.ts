import { legacy_createStore as createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authorsReducer } from './authors/reducer';
import { coursesReducer } from './courses/reducer';
import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  courses: coursesReducer,
  authors: authorsReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
