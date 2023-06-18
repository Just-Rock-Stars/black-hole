import { TGameState } from './types';

export const gameState: TGameState = {
  hole: {
    points: 50,
    maxSize: 50,
    x: 100,
    y: 100,
  },
  enemies: [],
  consumedEnemies: 0,
};
