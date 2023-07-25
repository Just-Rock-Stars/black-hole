import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { authApi } from '@api/authApi';

import { ITopicItemProps, IUserData } from '@pages/Forum/types';

import { randomAvatarPath } from '@utils/randomAvatarPath';

export const TopicItem: FC<ITopicItemProps> = ({
  data: { topicName, commentsNumber, authorId, lastMessageAuthor, lastMessageDate },
  idTopicList,
}) => {
  const [userData, setUserData] = useState<IUserData>({
    avatar: '',
    display_name: '',
    first_name: '',
  });

  useEffect(() => {
    authApi.getUserInfo().then((res) => setUserData(res.data));
  }, []);

  return (
    <div className="flex cursor-pointer odd:bg-white/20 rounded-xl px-2" key={authorId}>
      <div className="w-1/12">
        <img
          alt="Author_Icon"
          className="h-24"
          src={userData.avatar != null ? userData.avatar : randomAvatarPath}
        />
      </div>
      <div className="w-5/12">
        <Link to={`/forum/${idTopicList}/topics/${authorId}`}>
          <div className="text-lg font-bold hover:underline">{topicName}</div>
        </Link>
        <div className="text-xs mt-4 flex ">
          <div>Автор:</div>
          <div className="font-bold text-blue-400">
            {userData.display_name != null ? userData.display_name : userData.first_name}
          </div>
        </div>
      </div>
      <div className="w-4/12 flex items-center justify-center text-2xl font-bold">
        {commentsNumber}
      </div>
      <div className="w-2/12 flex flex-col justify-center">
        <div>Новое</div>
        <div className="text-blue-400">{lastMessageDate}</div>
        <div>{lastMessageAuthor}</div>
      </div>
    </div>
  );
};
