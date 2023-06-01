import { FC } from 'react';
import { AuthApi } from '../api/Auth/Auth';
import { Navbar } from '../components/Navbar';

const authApi = new AuthApi();
const logout = () => authApi.SignOut();

export const Profile: FC = () => {
  return (
    <>
      <Navbar />
      <h1 className="text-4xl font-bold">Profile</h1>
      <button className="text-white btn-primary" onClick={logout}>
        Выйти из профиля
      </button>
    </>
  );
};
