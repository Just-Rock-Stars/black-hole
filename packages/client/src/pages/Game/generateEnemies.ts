import { MAX_RATIO_TO_HOLE, MIN_NUMBER_OF_ENEMIES, MIN_RATIO_TO_HOLE } from './constants';
import { gameState } from './gameState';
import { getRandomInt } from './utils';

export function generateEnemies() {
  const numberOfVisibleEnemies = gameState.enemies.reduce((prev, curr) => {
    return curr.isVisible ? prev : prev + 1;
  }, 0);

  const lackOfEnemies = MIN_NUMBER_OF_ENEMIES - numberOfVisibleEnemies;

  // for (let i = 1; i <= lackOfEnemies; i++) {}
}

function generateRandomEnemy() {
  const {
    hole: { points: holePoints },
  } = gameState;
  const enemyPoints = getRandomInt(MIN_RATIO_TO_HOLE * holePoints, MAX_RATIO_TO_HOLE * holePoints);
}
