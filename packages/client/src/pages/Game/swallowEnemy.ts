import { HOLE_RADIUS } from './constants';
import { gameState } from './gameState';
import { doOverlap } from './utils';

export function swallowEnemy(points: number) {
  const { hole, enemies } = gameState;
  const oldPoints = hole.points;
  hole.points += points;
  const ratio = hole.points / oldPoints;

  enemies.forEach((enemy) => {
    enemy.radius = enemy.radius / ratio;
  });
}

export const swallowEnemiesNearby = (onGameOver: () => void) => {
  const { enemies, hole } = gameState;

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
        onGameOver();

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
