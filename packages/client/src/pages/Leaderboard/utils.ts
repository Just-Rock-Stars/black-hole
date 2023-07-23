import { TLeaderboardItems } from './types';

export const paginationLeaders = function (leaders: TLeaderboardItems[], currentPage: number) {
  return leaders.slice(currentPage * 10, currentPage * 10 + 10);
};

export const paginationPages = function (leaders: TLeaderboardItems[]) {
  const arr: number[] = [];
  leaders.forEach((item, index) => {
    if (index % 10 === 0) {
      arr.push(index / 10);
    }
  });

  return arr;
};
