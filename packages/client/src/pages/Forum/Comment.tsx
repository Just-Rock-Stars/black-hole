import axios from 'axios';
import { FC, useEffect, useState } from 'react';

import { authApi } from '@api/authApi';

import { randomAvatarPath } from '@utils/randomAvatarPath';

interface IComment {
  comment: {
    text: string;
    yaId: string;
  };
  index: number;
}

interface IUser {
  avatar: string;
  first_name: string;
}

export const CommentInTopic: FC<IComment> = ({ comment: { text, yaId }, index }) => {
  const [userData, setUserData] = useState<IUser>({ avatar: '', first_name: '' });

  useEffect(() => {
    axios.get(`ya-praktikum.tech/api/v2/user/${yaId}`).then((res) => setUserData(res.data));
  }, [yaId]);

  return (
    <div className="py-2 px-2 border-b-2 border-black">
      <div className="flex justify-between">
        <div className="text-blue-400">#{index + 1}</div>
      </div>
      <div className="flex">
        <div className="flex flex-col items-center justify-center w-2/12">
          <img
            alt="User_Avatar"
            className="h-24"
            src={userData.avatar != null ? userData.avatar : randomAvatarPath}
          />
          <div className="text-sm font-bold">{userData.first_name}</div>
        </div>
        <div className="w-8/12">{text}</div>
      </div>
      <div className="flex justify-end">
        <label className="btn-primary" htmlFor="comment">
          Ответить
        </label>
      </div>
    </div>
  );
};
