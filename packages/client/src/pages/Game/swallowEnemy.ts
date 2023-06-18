import { HOLE_RADIUS } from './constants';
import { gameState } from './gameState';
import { TOnGameEnd } from './types';
import { doOverlap } from './utils';

export function swallowEnemy(points: number) {
  const { hole, enemies } = gameState;
  const oldPoints = hole.points;
  hole.points += points;
  const ratio = hole.points / oldPoints;

  if (oldPoints < hole.points) {
    gameState.consumedEnemies += 1;
  }

  if (hole.maxSize < hole.points) {
    hole.maxSize = hole.points;
  }

  enemies.forEach((enemy) => {
    enemy.radius = enemy.radius / ratio;
  });
}

export const swallowEnemiesNearby = (onGameOver: (results: TOnGameEnd) => void) => {
  const { enemies, hole, consumedEnemies } = gameState;

  const enemiesIndicesToSwallow: number[] = [];

  enemies.forEach((enemy, enemyIndex) => {
    const isOverlap = doOverlap({
      en1: enemy,
      en2: hole,
      radius1: enemy.radius,
      radius2: HOLE_RADIUS,
    });

    if (isOverlap) {
      const pointsChange = enemy.points < hole.points ? enemy.points : -enemy.points / 2;

      const isGameOver = hole.points + pointsChange < 0;

      if (isGameOver) {
        const results: TOnGameEnd = {
          consumedEnemies,
          gameEndTimeStamp: Date.now(),
          maxSize: hole.maxSize,
          points: hole.points,
        };
        onGameOver(results);

        return;
      }

      swallowEnemy(pointsChange);
      enemiesIndicesToSwallow.push(enemyIndex);
    }
  });

  gameState.enemies = enemies.filter((_enemy, enemyIndex) => {
    return !enemiesIndicesToSwallow.includes(enemyIndex);
  });
};
