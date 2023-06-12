import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGetAuthorizedUserQuery } from '@store/authorizedUser/api';

import { randomAvatarPath } from '@utils/randomAvatarPath';

import { API_BASE_URL } from '@constants';

import { UserApi } from '@src/api/UserApi/UserApi';

export const Avatar: FC = () => {
  const { data: authorizedUser, refetch: refetchAuthorizedUser } = useGetAuthorizedUserQuery();

  const [isVisibleFormAvatar, setIsVisibleFormAvatar] = useState(false);
  const { register, handleSubmit } = useForm<{ picture: FileList }>();

  const onSubmit = (data: { picture: FileList }) => {
    const formData = new FormData();
    formData.append('avatar', data.picture[0]);

    const fetchServerData = async () => {
      const response = await UserApi.changeAvatar(formData);
      if (response.status === 200) {
        refetchAuthorizedUser();
        handleVisibleFormAvatar();
      }
    };

    fetchServerData();
  };

  const handleVisibleFormAvatar = () => {
    setIsVisibleFormAvatar((prev) => !prev);
  };

  if (authorizedUser === undefined) return null;

  const avatarUrl = authorizedUser.avatar
    ? `${API_BASE_URL}/resources${authorizedUser?.avatar}`
    : randomAvatarPath;

  return (
    <div className="flex flex-col justify-center items-center flex-wrap">
      <div className="flex justify-center align-middle flex-wrap w-32 h-32 bg-slate-50 rounded-full relative overflow-hidden">
        <img
          alt="avatar"
          className="max-h-full max-w-full hover:bg-opacity-1 rounded-full hover:opacity-70 cursor-pointer"
          onClick={handleVisibleFormAvatar}
          src={avatarUrl}
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
