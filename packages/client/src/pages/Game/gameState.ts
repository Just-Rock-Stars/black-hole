import { TGameState } from './types';

const initialState: TGameState = {
  hole: {
    points: 50,
    maxSize: 50,
    x: 100,
    y: 100,
  },
  enemies: [],
  consumedEnemies: 0,
  isGameInProcess: false,
};

export let gameState: TGameState = JSON.parse(JSON.stringify(initialState));

export const resetGameState = () => {
  gameState = JSON.parse(JSON.stringify(initialState));
};
