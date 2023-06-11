import { AxiosResponse } from 'axios';
import { instance as axios } from '../constants';
import {
  IChangePassword,
  IPasswordResponse,
  IUser,
  IUserResponse,
} from './types';

const changeAvatar = (data: FormData) => {
  return axios.put('/user/profile/avatar', data);
};

const changeUserProfile = (
  data: IUser
): Promise<AxiosResponse<IUserResponse>> => {
  return axios.put('/user/profile', data);
};

const changeUserPassword = (
  data: IChangePassword
): Promise<AxiosResponse<IPasswordResponse>> => {
  return axios.put('/user/password', data);
};

export const UserApi = {
  changeAvatar,
  changeUserProfile,
  changeUserPassword,
};
