import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  Color,
  GAME_ENTITY_FONT,
  HOLE_RADIUS,
  MOVE_STEP,
} from './constants';
import { moveEnemiesX } from './enemiesHandlers';
import { gameState } from './gameState';
import { generateEnemies } from './generateEnemies';
import { moveHoleX, moveHoleY } from './holeHandlers';
import { swallowEnemy } from './swallowEnemy';
import { TDraw } from './types';
import { doOverlap } from './utils';

const draw: TDraw = {
  space: (ctx) => {
    if (ctx.fillStyle !== 'gray') {
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  },
  enemies: (ctx) => {
    generateEnemies();

    gameState.enemies.forEach((enemy) => {
      if (enemy.isVisible) {
        ctx.fillStyle = Color.ENEMY_ASTEROID_BODY;
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.font = GAME_ENTITY_FONT;
        ctx.fillStyle = Color.ENEMY_POINTS_TEXT;
        ctx.fillText(enemy.points.toString(), enemy.x, enemy.y);
      }
    });
  },
  hole: (ctx) => {
    const { hole } = gameState;

    ctx.fillStyle = Color.HERO_BODY;
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, HOLE_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.font = GAME_ENTITY_FONT;
    ctx.fillStyle = Color.HERO_POINTS_TEXT;
    ctx.fillText(hole.points.toString(), hole.x, hole.y);
  },
};

const swallowEnemiesNearby = () => {
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
      swallowEnemy(pointsChange);
      enemiesIndicesToSwallow.push(enemyIndex);
    }
  });

  gameState.enemies = enemies.filter((_enemy, enemyIndex) => {
    return !enemiesIndicesToSwallow.includes(enemyIndex);
  });
};

export const requestAnimation = (canvasContext: CanvasRenderingContext2D) => {
  draw.space(canvasContext);
  draw.enemies(canvasContext);
  draw.hole(canvasContext);
  requestAnimationFrame(() => requestAnimation(canvasContext));
};

export const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowUp':
      moveHoleY(-MOVE_STEP);
      break;
    case 'ArrowDown':
      moveHoleY(MOVE_STEP);
      break;
    case 'ArrowLeft':
      moveEnemiesX(MOVE_STEP);
      moveHoleX(-MOVE_STEP);
      break;
    case 'ArrowRight':
      moveEnemiesX(-MOVE_STEP);
      moveHoleX(MOVE_STEP);
      break;
    default:
      break;
  }

  swallowEnemiesNearby();
};
