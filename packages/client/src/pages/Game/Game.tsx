import { FC, useEffect, useRef } from 'react';
import { Navbar } from '../../components/Navbar';
import { requestAnimation, handleKeyDown } from './helpers';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';

export const Game: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const canvasContext = canvas.getContext('2d');
    if (canvasContext === null) return;

    requestAnimation(canvasContext);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Navbar />
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </>
  );
};
