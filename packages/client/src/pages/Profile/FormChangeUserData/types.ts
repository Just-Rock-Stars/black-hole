import { TUser } from '@app-types/TUser';

export type TFormChangeUserData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type TUserData = Omit<TUser, 'id' | 'display_name' | 'avatar'> & {
  display_name: string;
};
