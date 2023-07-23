import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { leaderboardApi } from '@api/leaderboardApi';

import { useAppSelector } from '@utils/useAppSelector';

import { RoutePaths } from '@src/providers/AppRouter/constants';

export const GameEnd: FC = () => {
  const {
    consumedEnemies,
    maxSize,
    gameDuration: playTime,
    points,
  } = useAppSelector((state) => state.gameStats);
  const playTimeInSeconds = (playTime ?? 0) / 1000;

  useEffect(() => {
    if (!maxSize || !consumedEnemies) return;

    const userData = localStorage.getItem('user');

    if (!userData) return;

    const user = JSON.parse(userData);

    leaderboardApi.saveResult({
      data: {
        userDisplayName: user.display_name,
        userID: user.id,
        userAvatar: user.avatar,
        score: maxSize,
        consumedEnemies: consumedEnemies,
      },
      ratingFieldName: 'score',
      teamName: 'JustRockStars',
    });
  }, [maxSize, consumedEnemies]);

  return (
    <section className="page-container overlay my-6 px-4 lg:px-10 flex flex-col">
      <h1 className="font-black m-0 text-center text-4xl my-6">GAME OVER</h1>
      <p className="text-base my-2">
        Ваше космическое путешествие подошло к концу... на время. Вы показали невероятные навыки
        поглощения и непреодолимый аппетит в этой галактической схватке. Мироздание может
        выдохнуть... но не надолго!
      </p>
      <p className="font-bold text-xl my-2">Вот ваши впечатляющие достижения:</p>
      <ul className="list-disc pl-5">
        <li>
          Время прохождения:&nbsp;
          <span className="font-bold text-rose-500">{Math.ceil(playTimeInSeconds)}</span>
        </li>
        <li>
          Набранные очки:&nbsp;<span className="font-bold text-rose-500">{points ?? 0}</span>
        </li>
        <li>
          Максимальный размер:&nbsp;
          <span className="font-bold text-rose-500">{maxSize ?? 0}</span>
        </li>
        <li>
          Количество поглощенных объектов:&nbsp;
          <span className="font-bold text-rose-500">{consumedEnemies ?? 0}</span>
        </li>
      </ul>
      <p className="text-base my-2">
        Но знаем мы одно - космический аппетит никогда не утихает полностью! Подобно сияющим звездам
        на темном небе, ваше стремление к победе не иссякнет.
      </p>
      <p className="text-base my-2">
        Готовы вновь ощутить всю мощь и величие вселенной? Нажмите
        <span className="italic"> &quot;Поглотить вселенную снова&quot; </span> и продолжите свое
        поглощающее путешествие, становясь еще больше, еще сильнее! Или если вам нужно немного
        отдохнуть, кнопка
        <span className="italic"> &quot;Вернуться на главную&quot; </span> приведет вас обратно к
        тихому причалу нашей главной страницы.
      </p>
      <p className="text-xl font-bold my-2 text-center sm:text-left">
        Определите свой следующий путь, о могучий поглотитель космоса!
      </p>
      <div className="flex flex-col md:flex-row w-full gap-4 text-center py-4 md:py-0">
        <Link className="btn btn-primary md:my-6" to={RoutePaths.GAME}>
          Поглотить вселенную снова ✨
        </Link>
        <Link className="btn btn-primary md:my-6" to={RoutePaths.HOME}>
          Вернуться на главную
        </Link>
      </div>
    </section>
  );
};
