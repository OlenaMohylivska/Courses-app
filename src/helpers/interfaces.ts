export interface ICourse {
  id?: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
  authorsNames?: (string | undefined)[];
}

export interface IAuthor {
  id?: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}
export interface IUser extends ILogin {
  name: string;
}

export interface IUserState {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
  role: string;
}

export interface IStatus {
  status: string;
  error?: null | string;
}

export interface IUserCredentials extends IUser {
  role: string;
  id: string;
}
