import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { authApi } from '@api/authApi';

import { ITopicItemProps, IUserData } from '@pages/Forum/types';

import { randomAvatarPath } from '@utils/randomAvatarPath';

export const TopicItem: FC<ITopicItemProps> = ({
  data: { topicName, commentsNumber, authorId, lastMessageAuthor, lastMessageDate, topicId },
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
    <div className="py-3 px-2 flex font-black cursor-pointer odd:bg-white/20" key={authorId}>
      <div className="hidden md:w-1/12 md:block">
        <img
          alt="Author_Icon"
          className="h-24"
          src={userData.avatar != null ? userData.avatar : randomAvatarPath}
        />
      </div>

      <div className="w-4/12 flex flex-col justify-between md:w-4/12">
        <Link to={`/forum/${idTopicList}/topics/${topicId}`}>
          <div className="max-h-12 text-sm font-bold overflow-hidden hover:underline md:text-xl">
            {topicName}
          </div>
        </Link>

        <div className="mt-4 text-xs font-thin flex">
          <div>Автор:</div>
          <div className="ml-1 text-blue-400 font-bold">
            {userData.display_name != null ? userData.display_name : userData.first_name}
          </div>
        </div>
      </div>

      <div className="w-4/12 text-xl font-bold flex items-center justify-center md:text-2xl  md:w-2/12">
        {commentsNumber}
      </div>

      <div className="w-2/12 text-xs font-thin flex flex-col justify-center md:w-5/12 md:text-xl md:items-center">
        <div className="font-bold md:text-2xl">Новое</div>
        <div className="my-1 text-blue-400">{lastMessageDate}</div>
        <div>{lastMessageAuthor}</div>
      </div>
    </div>
  );
};
