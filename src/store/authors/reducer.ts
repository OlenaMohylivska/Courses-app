import { createReducer } from '@reduxjs/toolkit';
import { IAuthor } from '../../helpers/interfaces';
import { addAuthor, cleanAuthors, getAuthors } from './actionCreators';

const authorsInitialState: IAuthor[] = []; // delete export

export const authorsReducer = createReducer(authorsInitialState, (builder) => {
  builder
    .addCase(getAuthors, (state, action) => action.payload)
    .addCase(addAuthor, (state, action) => [...state, action.payload])
    .addCase(cleanAuthors, () => authorsInitialState)
    .addDefaultCase((state) => state);
});

// export const authorsReducer = (
//   state = authorsInitialState,
//   action: IAction
// ) => {
//   switch (action.type) {
//     case GET_AUTHORS:
//       return action.payload;
//     case ADD_AUTHOR:
//       return [...state, action.payload];

//     default:
//       return state;
//   }
// };

// export const authorsReducer = createReducer(authorsInitialState, {
//   [GET_AUTHORS]: (state, action) => action.payload,
//   [ADD_AUTHOR]: (state, action) => [...state, action.payload],
//   default: (state) => state,
// });
