import { FC } from 'react';
import { authApi } from '../api/Auth/Auth';
import { Header } from '../components/Header';

const logout = () => authApi.SignOut();

export const Profile: FC = () => {
  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold">Profile</h1>
      <button className="text-white btn-primary" onClick={logout}>
        Выйти из профиля
      </button>
    </>
  );
};
