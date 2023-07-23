import { FC, useEffect, useState } from 'react';

import { leaderboardApi } from '@api/leaderboardApi/leaderboardApi';

import { Pagination } from '@components/Pagination/Pagination';

import { LeadersListItem } from './LeadersListItem/LeadersListItem';
import { TLeaderboardItems } from './types';
import { paginationLeaders, paginationPages } from './utils';

export const Leaderboard: FC = () => {
  const [leaders, setLeaders] = useState<TLeaderboardItems[]>([]);
  const [currectLeaders, setCurrectLeaders] = useState<TLeaderboardItems[]>([]);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    async function getData() {
      const response = await leaderboardApi.getLeaderBoard({
        ratingFieldName: 'score',
        cursor: 0,
        limit: 100,
      });

      const data = response.data;
      setPages(paginationPages(data));
      setLeaders(data);
      setCurrectLeaders(paginationLeaders(data, currentPage));
    }
    if (leaders.length === 0) {
      getData();
    }
  }, [leaders.length, currentPage]);

  // Разделение и отрисовка лидеров на странице в зависимости от неё
  useEffect(() => {
    setCurrectLeaders(paginationLeaders(leaders, currentPage));
  }, [currentPage, leaders]);

  return (
    <section className="overlay page-container my-6">
      <h1 className="mb-2 text-4xl font-black text-center md:text-start">Лидеры</h1>

      <ul className="flex my-4 text-center text-sm">
        <li className="w-1/12 flex items-center justify-center">№</li>
        <li className="w-4/12 flex items-center justify-center">Никнейм</li>
        <li className="w-3/12 flex items-center justify-center">Счёт</li>
        <li className="w-4/12 flex justify-center items-center">Поглощено объектов</li>
      </ul>
      <ul>
        {currectLeaders.map(({ data }, place) => {
          return <LeadersListItem data={data} key={data.userID} place={place} />;
        })}
      </ul>

      {/* Пагинация */}
      <Pagination currentPage={currentPage} pages={pages} switchPages={setCurrentPage} />
    </section>
  );
};
