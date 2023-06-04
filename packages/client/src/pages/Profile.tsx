import { FC } from 'react';
import { authApi } from '../api/Auth/Auth';
import { Navbar } from '../components/Navbar';

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
