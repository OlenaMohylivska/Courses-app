import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '../../routes';

export const RequireAuth: React.FC = () => {
  if (!localStorage.getItem('userToken')) {
    return <Navigate replace to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
};
