import { IUser } from '../types';

export interface IFormChangeUserDataProps {
  userInfo: IUser;
  fetchUserInfo: VoidFunction;
}

export interface IFormChangeUserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IUserData
  extends Omit<IUser, 'id' | 'display_name' | 'avatar'> {
  display_name: string;
}
