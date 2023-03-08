import React from 'react';
import { Navigate } from 'react-router-dom';
import { admin } from '../../constants';
import { IUserState } from '../../helpers/interfaces';
import { ROUTES } from '../../routes';

type Props = {
  user: IUserState;
  children: React.ReactElement;
};

export const PrivateRoute: React.FC<Props> = ({ user: { role }, children }) =>
  role === admin ? children : <Navigate replace to={ROUTES.COURSES} />;
