import { AxiosResponse } from 'axios';

export interface IUserRepository {
  getCurrentUser(): Promise<AxiosResponse<TCurrentUserResponse>>;
}

export type TCurrentUserResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};
