import { AxiosInstance } from 'axios';

import { instance as defaultInstance } from '../constants';
import { IAuth, SignInDto, SignUpDto, SignUpResponse } from './types';

export class AuthApi implements IAuth {
  private readonly instance: AxiosInstance;

  constructor(ctorInstance?: AxiosInstance) {
    this.instance = ctorInstance ?? defaultInstance;
  }

  GetUserInfo() {
    return this.instance.get('/auth/user');
  }

  SignIn(dto: SignInDto) {
    return this.instance.post<Record<string, never>>('/auth/signin', dto);
  }

  SignOut() {
    return this.instance.post<Record<string, never>>('/auth/logout');
  }

  SignUp(dto: SignUpDto) {
    return this.instance.post<SignUpResponse>('/auth/signup', dto);
  }
}

export const authApi = new AuthApi();
