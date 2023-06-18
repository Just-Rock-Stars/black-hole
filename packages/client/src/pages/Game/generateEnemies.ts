import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  HOLE_RADIUS,
  MAX_RATIO_TO_HOLE,
  MIN_NUMBER_OF_ENEMIES,
  MIN_RATIO_TO_HOLE,
} from './constants';
import { gameState } from './gameState';
import { TEnemy } from './types';
import { doOverlap, getRandomInt } from './utils';

export function generateEnemies() {
  const numberOfVisibleEnemies = gameState.enemies.reduce((prev, curr) => {
    return curr.isVisible ? prev + 1 : prev;
  }, 0);

  const lackOfEnemies = MIN_NUMBER_OF_ENEMIES - numberOfVisibleEnemies;

  for (let i = 1; i <= lackOfEnemies; i++) {
    const newEnemy = generateRandomEnemy();
    gameState.enemies.push(newEnemy);
  }
}

function generateRandomEnemy(): TEnemy {
  let radiusFactor = 1;

  if (gameState.enemies.length >= 1) {
    radiusFactor = gameState.enemies[0].radius / gameState.enemies[0].points;
  }

  const {
    hole: { points: holePoints },
  } = gameState;
  const points = getRandomInt(MIN_RATIO_TO_HOLE * holePoints, MAX_RATIO_TO_HOLE * holePoints);
  const radius = points * radiusFactor;
  const x = getRandomInt(gameState.hole.x + HOLE_RADIUS + 1, CANVAS_WIDTH);
  const y = getRandomInt(0, CANVAS_HEIGHT);

  const newEnemy: TEnemy = {
    isVisible: true,
    points,
    radius,
    x,
    y,
  };

  let hasOverlap = doOverlap({
    en1: newEnemy,
    en2: gameState.hole,
    radius1: newEnemy.radius,
    radius2: HOLE_RADIUS,
  });

  if (hasOverlap) {
    return generateRandomEnemy();
  }

  hasOverlap = gameState.enemies.some((enemy) =>
    doOverlap({ en1: enemy, en2: newEnemy, radius1: enemy.radius, radius2: newEnemy.radius })
  );

  if (hasOverlap) {
    return generateRandomEnemy();
  }

  return newEnemy;
}
