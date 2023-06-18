import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '@components/Header';

import { RoutePaths } from '@src/providers/Router/AppRouter/constants';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import { handleKeyDown } from './eventListeners';
import { requestAnimation } from './mainEntry';

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
    const listener = (e: KeyboardEvent) => {
      handleKeyDown(e, () => navigate(RoutePaths.GAME_END));
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
