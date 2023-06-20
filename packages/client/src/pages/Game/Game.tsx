import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { gameStatsSlice } from '@store/slices/gameStats/gameStatsSlice';
import { TSetGameStatsPayload } from '@store/slices/gameStats/types';

import { Header } from '@components/Header';

import { useAppDispatch } from '@utils/useAppDispatch';

import { RoutePaths } from '@src/providers/Router/AppRouter/constants';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import { handleKeyDown } from './eventListeners';
import { gameState, resetGameState } from './gameState';
import { requestAnimation } from './mainEntry';
import { TOnGameEnd } from './types';

export const Game: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const canvasContext = canvas.getContext('2d');
    if (canvasContext === null) return;

    gameState.isGameInProcess = true;

    requestAnimation(canvasContext);
  }, []);

  useEffect(() => {
    const gameStartTimestamp = Date.now();
    const listener = (e: KeyboardEvent) => {
      const onGameEnd = ({ consumedEnemies, gameEndTimeStamp, maxSize, points }: TOnGameEnd) => {
        const playTime = gameEndTimeStamp - gameStartTimestamp;
        const gameStatistics: TSetGameStatsPayload = {
          consumedEnemies: consumedEnemies,
          maxPoints: maxSize,
          points: points,
          gameDuration: playTime,
        };

        dispatch(gameStatsSlice.actions.setGameStats(gameStatistics));

        resetGameState();

        navigate(RoutePaths.GAME_END);
      };
      handleKeyDown(e, onGameEnd);
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <>
      <Header />
      <canvas height={CANVAS_HEIGHT} ref={canvasRef} width={CANVAS_WIDTH} />
    </>
  );
};
