import { TGameState } from './types';

export const gameState: TGameState = {
  currentScreen: 0,
  hole: {
    points: 50,
    x: 100,
    y: 100,
  },
  enemies: [
    { x: 175, y: 100, points: 10, isVisible: true },
    { x: 200, y: 200, points: 20, isVisible: true },
    { x: 100, y: 250, points: 30, isVisible: true },
    { x: 500, y: 400, points: 125, isVisible: true },
    { x: 600, y: 200, points: 30, isVisible: true },
  ],
};
