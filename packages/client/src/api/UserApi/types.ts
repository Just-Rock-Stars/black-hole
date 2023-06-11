export interface IUser {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IUserResponse extends Omit<IUser, 'display_name'> {
  id: number;
  display_name: string | null;
  avatar: string | null;
  status: null;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IPasswordResponse {
  reason: 'string';
}
