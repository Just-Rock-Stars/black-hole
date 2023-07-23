import { baseAxiosInstance } from '@api/baseAxiosInstance';

import { TGetLeaderBoard, TSaveResult } from './types';

const saveResult = (data: TSaveResult) => {
  return baseAxiosInstance.post('/leaderboard', data);
};

const getLeaderBoard = (data: TGetLeaderBoard) => {
  return baseAxiosInstance.post('/leaderboard/JustRockStars', data);
};

export const leaderboardApi = {
  saveResult,
  getLeaderBoard,
};
