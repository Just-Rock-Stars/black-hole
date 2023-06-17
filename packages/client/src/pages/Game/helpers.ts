import { CANVAS_HEIGHT, CANVAS_WIDTH, Color, GAME_ENTITY_FONT, MOVE_STEP } from './constants';
import { moveEnemiesX } from './enemiesHandlers';
import { gameState } from './gameState';
import { moveHoleX, moveHoleY } from './holeHandlers';
import { TDraw } from './types';

const draw: TDraw = {
  space: (ctx) => {
    if (ctx.fillStyle !== 'gray') {
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  },
  enemies: (ctx) => {
    gameState.enemies.forEach((enemy) => {
      if (enemy.isVisible) {
        ctx.fillStyle = Color.ENEMY_ASTEROID_BODY;
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.points, 0, 2 * Math.PI);
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
    ctx.arc(hole.x, hole.y, hole.points, 0, 2 * Math.PI);
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
    const distanceBetweenCentersByX = Math.abs(hole.x - enemy.x);
    const distanceBetweenCentersByY = Math.abs(hole.y - enemy.y);

    const distanceByX = Math.max(distanceBetweenCentersByX - hole.points - enemy.points, 0);
    const distanceByY = Math.max(distanceBetweenCentersByY - hole.points - enemy.points, 0);

    const haveOverlap = distanceByX === 0 && distanceByY === 0;

    if (haveOverlap && enemy.points < hole.points) {
      hole.points += enemy.points;
      enemiesIndicesToSwallow.push(enemyIndex);
    }

    if (haveOverlap && enemy.points >= hole.points) {
      hole.points -= enemy.points / 2;
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
