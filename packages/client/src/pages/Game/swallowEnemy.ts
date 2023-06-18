import { gameState } from './gameState';

export function swallowEnemy(points: number) {
  const { hole, enemies } = gameState;
  const oldPoints = hole.points;
  hole.points += points;
  const ratio = hole.points / oldPoints;

  enemies.forEach((enemy) => {
    enemy.radius = enemy.radius / ratio;
  });
}
