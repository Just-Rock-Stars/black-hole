import { CANVAS_HEIGHT, CANVAS_WIDTH, HOLE_RADIUS, HOLE_RADIUSES_PADDING } from './constants';
import { gameState } from './gameState';

export function moveHoleX(step: number) {
  const hole = gameState.hole;

  const isHoleGoingBeyondScreenStart = hole.x <= HOLE_RADIUS && step < 0;
  const isHoleGoingBeyondScreenEnd =
    hole.x >= CANVAS_WIDTH - HOLE_RADIUS * HOLE_RADIUSES_PADDING && step > 0;

  const shouldHoleStop = isHoleGoingBeyondScreenStart || isHoleGoingBeyondScreenEnd;

  if (shouldHoleStop) {
    return;
  }

  hole.x += step;
}

export function moveHoleY(step: number) {
  const hole = gameState.hole;

  const isHoleGoingBeyondCeil = hole.y + step < HOLE_RADIUS && step < 0;
  const isHoleGoingBelowFloor = hole.y + step > CANVAS_HEIGHT - HOLE_RADIUS && step > 0;
  const shouldStop = isHoleGoingBeyondCeil || isHoleGoingBelowFloor;

  if (shouldStop) {
    return;
  }

  hole.y += step;
}
