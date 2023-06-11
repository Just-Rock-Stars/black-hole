import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IAvatarProps } from './types';
import { UserApi } from '../../../api/UserApi/UserApi';
import { BASE_URL } from '../../../api/constants';

export const Avatar: FC<IAvatarProps> = ({ avatar, fetchUserInfo }) => {
  const [isVisibleFormAvatar, setIsVisibleFormAvatar] = useState(false);
  const { register, handleSubmit } = useForm<{ picture: FileList }>();
  const AVATAR_URL = `${BASE_URL}/resources${avatar}`;
  const RANDOM_AVATAR_PATH = `https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${Math.random()}&radius=20`;

  const onSubmit = (data: { picture: FileList }) => {
    const formData = new FormData();
    formData.append('avatar', data.picture[0]);

    const fetchServerData = async () => {
      const response = await UserApi.changeAvatar(formData);
      if (response.status === 200) {
        fetchUserInfo();
        handleVisibleFormAvatar();
      }
    };

    fetchServerData();
  };

  const handleVisibleFormAvatar = () => {
    setIsVisibleFormAvatar(prev => !prev);
  };

  return (
    <div className="flex flex-col justify-center items-center flex-wrap">
      <div className="flex justify-center align-middle flex-wrap w-32 h-32 bg-slate-50 rounded-full relative overflow-hidden">
        <img
          src={avatar ? AVATAR_URL : RANDOM_AVATAR_PATH}
          alt="avatar"
          className="max-h-full max-w-full hover:bg-opacity-1 rounded-full hover:opacity-70 cursor-pointer"
          onClick={handleVisibleFormAvatar}
        />
      </div>
      {isVisibleFormAvatar && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('picture')} type="file" />
          <button className="text-white btn-primary">Отправить</button>
        </form>
      )}
    </div>
  );
};
