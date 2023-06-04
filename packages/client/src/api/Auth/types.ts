import { AxiosResponse } from 'axios';

export type SignInDto = {
  login: string;
  password: string;
};

export type SignUpDto = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpResponse = { id: number };

export interface IAuth {
  SignIn(dto: SignInDto): Promise<AxiosResponse<Record<string, never>>>;

  SignOut(): Promise<AxiosResponse<Record<string, never>>>;

  SignUp(dto: SignUpDto): Promise<AxiosResponse<SignUpResponse>>;
}
