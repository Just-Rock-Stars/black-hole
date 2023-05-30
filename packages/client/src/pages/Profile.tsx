import { FC } from 'react';
import { AuthApi } from '../api/Auth/Auth';
import Button from '../components/Button';
import { Navbar } from '../components/Navbar';

const authApi = new AuthApi();
const logout = () => authApi.SignOut();

export const Profile: FC = () => {
  return (
    <>
      <Navbar />
      <h1 className="text-4xl font-bold">Profile</h1>
      <Button text="Выйти из профиля" className="text-white" onClick={logout} />
    </>
  );
};
