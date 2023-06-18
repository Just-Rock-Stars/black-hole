import { CANVAS_HEIGHT, CANVAS_WIDTH, Color, GAME_ENTITY_FONT, HOLE_RADIUS } from './constants';
import { gameState } from './gameState';
import { generateEnemies } from './generateEnemies';
import { TDraw } from './types';

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

export const requestAnimation = (canvasContext: CanvasRenderingContext2D) => {
  draw.space(canvasContext);
  draw.enemies(canvasContext);
  draw.hole(canvasContext);
  requestAnimationFrame(() => requestAnimation(canvasContext));
};
