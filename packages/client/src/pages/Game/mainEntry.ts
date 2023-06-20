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
    if (ctx.fillStyle !== 'gray') {
      // ctx.fillStyle = 'gray';
      // ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const img = new Image();
      img.src = assets.background;
      ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  },
  hole: (ctx) => {
    const { hole } = gameState;

    const gradient = ctx.createRadialGradient(hole.x, hole.y, 0, hole.x, hole.y, HOLE_RADIUS);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(0.3, 'rgba(10, 10, 10, 0.6)');
    gradient.addColorStop(0.7, 'rgba(30, 30, 30, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, HOLE_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

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
  enemies: (ctx) => {
    generateEnemies();

    gameState.enemies.forEach((enemy) => {
      if (!enemy.isVisible) {
        return;
      }

      const gradient = ctx.createRadialGradient(enemy.x, enemy.y, 0, enemy.x, enemy.y, HOLE_RADIUS);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.3, 'rgba(10, 10, 10, 0.6)');
      gradient.addColorStop(0.7, 'rgba(30, 30, 30, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

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
    });
  },
};

export const requestAnimation = (canvasContext: CanvasRenderingContext2D) => {
  draw.space(canvasContext);
  draw.enemies(canvasContext);
  draw.hole(canvasContext);
  requestAnimationFrame(() => requestAnimation(canvasContext));
};

// import {
//   CANVAS_HEIGHT,
//   CANVAS_WIDTH,
//   Color,
//   GAME_ENTITY_FONT,
//   MOVE_STEP,
//   assets,
// } from './constants';
// import { gameState } from './gameState';
// import { TDraw } from './types';

// const draw: TDraw = {
//   space: (canvasContext) => {
//     const img = new Image();
//     img.src = assets.background;
//     canvasContext.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//   },
//   hole: (canvasContext) => {
//     const { hole } = gameState;

//     const img = new Image();
//     img.src = assets.hole;

//     canvasContext.drawImage(img, hole.x, hole.y, hole.points * 2, hole.points * 2);
//     canvasContext.beginPath();
//   },
//   enemies: (canvasContext) => {
//     gameState.enemies.forEach((enemy) => {
//       const img = new Image();
//       img.src = assets.enemy;
//       canvasContext.drawImage(img, enemy.x, enemy.y, enemy.points * 2, enemy.points * 2);

//       canvasContext.font = GAME_ENTITY_FONT;
//       canvasContext.fillStyle = Color.ENEMY_POINTS_TEXT;
//       canvasContext.fillText(enemy.points.toString(), enemy.x, enemy.y);
//     });
//   },
// };

// const swallowEnemiesNearby = () => {
//   const { enemies, hole } = gameState;

//   const enemiesIndicesToSwallow: number[] = [];

//   enemies.forEach((enemy, enemyIndex) => {
//     const distanceBetweenCentersByX = Math.abs(hole.x - enemy.x);
//     const distanceBetweenCentersByY = Math.abs(hole.y - enemy.y);

//     const distanceByX = Math.max(distanceBetweenCentersByX - hole.points - enemy.points, 0);
//     const distanceByY = Math.max(distanceBetweenCentersByY - hole.points - enemy.points, 0);

//     const haveOverlap = distanceByX === 0 && distanceByY === 0;

//     if (haveOverlap && enemy.points < hole.points) {
//       hole.points += enemy.points;
//       enemiesIndicesToSwallow.push(enemyIndex);
//     }
//     if (haveOverlap && enemy.points >= hole.points) {
//       hole.points -= enemy.points / 2;
//       enemiesIndicesToSwallow.push(enemyIndex);
//     }
//   });

//   gameState.enemies = enemies.filter((enemy, enemyIndex) => {
//     return !enemiesIndicesToSwallow.includes(enemyIndex);
//   });
// };

// export const requestAnimation = (canvasContext: CanvasRenderingContext2D) => {
//   draw.space(canvasContext);
//   draw.enemies(canvasContext);
//   draw.hole(canvasContext);
//   requestAnimationFrame(() => requestAnimation(canvasContext));
// };

// export const handleKeyDown = (event: KeyboardEvent) => {
//   switch (event.key) {
//     case 'ArrowUp':
//       gameState.hole.y -= MOVE_STEP;
//       break;
//     case 'ArrowDown':
//       gameState.hole.y += MOVE_STEP;
//       break;
//     case 'ArrowLeft':
//       gameState.hole.x -= MOVE_STEP;
//       break;
//     case 'ArrowRight':
//       gameState.hole.x += MOVE_STEP;
//       break;
//     default:
//       break;
//   }

//   swallowEnemiesNearby();
// };
