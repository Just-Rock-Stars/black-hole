import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  Color,
  GAME_ENTITY_FONT,
  HOLE_RADIUS,
  assets,
} from './constants';
import { gameState } from './gameState';
import { generateEnemies } from './generateEnemies';
import { TDraw } from './types';

const draw: TDraw = {
  space: (ctx) => {
    const img = new Image();
    img.src = assets.background;
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  },
  enemies: (ctx) => {
    generateEnemies();

    gameState.enemies.forEach((enemy) => {
      if (enemy.isVisible) {
        const img = new Image();
        img.src = assets.enemy;
        ctx.drawImage(
          img,
          enemy.x - enemy.radius,
          enemy.y - enemy.radius,
          enemy.radius * 2,
          enemy.radius * 2
        );

        ctx.font = GAME_ENTITY_FONT;
        ctx.fillStyle = Color.ENEMY_POINTS_TEXT;
        ctx.fillText(enemy.points.toString(), enemy.x, enemy.y);
      }
    });
  },
  hole: (ctx) => {
    const { hole } = gameState;

    const img = new Image();
    img.src = assets.hole;

    ctx.drawImage(
      img,
      hole.x - HOLE_RADIUS,
      hole.y - HOLE_RADIUS,
      HOLE_RADIUS * 2,
      HOLE_RADIUS * 2
    );

    ctx.font = GAME_ENTITY_FONT;
    ctx.fillStyle = Color.HERO_POINTS_TEXT;
    ctx.fillText(hole.points.toString(), hole.x, hole.y);
  },
};

export const requestAnimation = (canvasContext: CanvasRenderingContext2D) => {
  draw.space(canvasContext);
  draw.enemies(canvasContext);
  draw.hole(canvasContext);

  if (gameState.isGameInProcess) {
    requestAnimationFrame(() => requestAnimation(canvasContext));
  }
};
