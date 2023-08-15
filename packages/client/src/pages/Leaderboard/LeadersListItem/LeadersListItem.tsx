import { FC } from 'react';

import { randomAvatarPath } from '@utils/randomAvatarPath';

import { API_BASE_URL } from '@constants';

import { ILeadersListItem } from './types';

export const LeadersListItem: FC<ILeadersListItem> = ({
  data: { userID, userDisplayName, userAvatar, score, consumedEnemies },
  place,
}) => {
  return (
    <li className="py-2 flex text-center text-sm odd:bg-white/20" key={userID}>
      <p className="w-1/12 flex items-center justify-center">{place + 1}</p>

      <div className="w-4/12 flex items-center justify-center">
        <img
          alt=""
          className="h-10 w-10 rounded-full"
          src={userAvatar != null ? `${API_BASE_URL}/resources${userAvatar}` : randomAvatarPath}
        />

        <p className="ml-2 w-5/12 text-sm font-medium text-blue-500">
          {userDisplayName} id:{userID}
        </p>
      </div>

      <p className="w-3/12 flex items-center justify-center">{score}</p>

      <p className="w-4/12 flex items-center justify-center">{consumedEnemies}</p>
    </li>
  );
};
