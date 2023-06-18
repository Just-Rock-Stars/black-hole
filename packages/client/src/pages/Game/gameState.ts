import { TGameState } from './types';

export const gameState: TGameState = {
  currentScreen: 0,
  hole: {
    points: 50,
    x: 100,
    y: 100,
  },
  enemies: [
    { x: 150, y: 200, points: 10, radius: 10, isVisible: true },
    { x: 200, y: 200, points: 20, radius: 20, isVisible: true },
    { x: 100, y: 250, points: 30, radius: 30, isVisible: true },
    { x: 500, y: 400, points: 125, radius: 125, isVisible: true },
    { x: 600, y: 200, points: 30, radius: 30, isVisible: true },
  ],
};
