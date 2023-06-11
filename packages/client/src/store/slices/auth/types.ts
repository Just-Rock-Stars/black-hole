export interface User {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: null | string;
  avatar: null | string;
  email: string;
  phone: string;
}

export interface UserSchema {
  authData: User | null;
  isInited: boolean;
}
