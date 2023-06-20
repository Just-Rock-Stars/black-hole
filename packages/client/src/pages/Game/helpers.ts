import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  Color,
  GAME_ENTITY_FONT,
  MOVE_STEP,
  assets,
} from './constants';
import { gameState } from './gameState';
import { TDraw } from './types';

const draw: TDraw = {
  space: (canvasContext) => {
    const img = new Image();
    img.src = assets.background;
    canvasContext.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  },
  enemies: (canvasContext) => {
    gameState.enemies.forEach((enemy) => {
      const img = new Image();
      img.src = assets.enemy;
      canvasContext.drawImage(img, enemy.x, enemy.y, enemy.points * 2, enemy.points * 2);

      canvasContext.font = GAME_ENTITY_FONT;
      canvasContext.fillStyle = Color.ENEMY_POINTS_TEXT;
      canvasContext.fillText(enemy.points.toString(), enemy.x, enemy.y);
    });
  },
  hole: (canvasContext) => {
    const { hole } = gameState;

    const img = new Image();
    img.src = assets.hole;

    canvasContext.drawImage(img, hole.x, hole.y, hole.points * 2, hole.points * 2);
    canvasContext.beginPath();
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

  gameState.enemies = enemies.filter((enemy, enemyIndex) => {
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
      gameState.hole.y -= MOVE_STEP;
      break;
    case 'ArrowDown':
      gameState.hole.y += MOVE_STEP;
      break;
    case 'ArrowLeft':
      gameState.hole.x -= MOVE_STEP;
      break;
    case 'ArrowRight':
      gameState.hole.x += MOVE_STEP;
      break;
    default:
      break;
  }

  swallowEnemiesNearby();
};
