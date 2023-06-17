import { MAX_RADIUS } from './constants';
import { gameState } from './gameState';
import { TGameEntity } from './types';

export function scale(ctx: CanvasRenderingContext2D) {
  const visibleEntities: TGameEntity[] = [...gameState.enemies].filter((e) => e.isVisible);
  visibleEntities.push(gameState.hole);
  const theBiggestRadius = Math.max(...visibleEntities.map((e) => e.points));

  if (theBiggestRadius > MAX_RADIUS) {
    const ratio = theBiggestRadius / MAX_RADIUS;
    ctx.scale(ratio, ratio);
  }
}
