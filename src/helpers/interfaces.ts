export interface IAuthor {
  id: string;
  name: string;
}
export interface ICourse {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
  authorsNames?: (string | undefined)[];
}
export interface ILogin {
  email: string;
  password: string;
}
export interface IUser extends ILogin {
  name: string;
}

export interface IState {
  user: {
    isAuth: boolean;
    name: string;
    email: string;
    token: string;
  };
  courses: [];
  authors: [];
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface IUserState {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
}
