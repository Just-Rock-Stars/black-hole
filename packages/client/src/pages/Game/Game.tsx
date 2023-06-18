import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '@components/Header';

import { RoutePaths } from '@src/providers/Router/AppRouter/constants';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import { handleKeyDown } from './eventListeners';
import { requestAnimation } from './mainEntry';
import { TOnGameEnd } from './types';

export const Game: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const canvasContext = canvas.getContext('2d');
    if (canvasContext === null) return;

    requestAnimation(canvasContext);
  }, []);

  useEffect(() => {
    const gameStartTimestamp = Date.now();
    const listener = (e: KeyboardEvent) => {
      const onGameEnd = (results: TOnGameEnd) => {
        const playTime = results.gameEndTimeStamp - gameStartTimestamp;
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
