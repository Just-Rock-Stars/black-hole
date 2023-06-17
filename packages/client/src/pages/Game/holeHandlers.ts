import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import { gameState } from './gameState';

export function moveHoleX(step: number) {
  const hole = gameState.hole;

  const isHoleGoingBeyondScreenStart = hole.x <= hole.points && step < 0;
  const isHoleGoingBeyondScreenEnd = hole.x >= CANVAS_WIDTH - hole.points * 2 && step > 0;

  const shouldHoleStop = isHoleGoingBeyondScreenStart || isHoleGoingBeyondScreenEnd;

  if (shouldHoleStop) {
    return;
  }

  hole.x += step;
}

export function moveHoleY(step: number) {
  const hole = gameState.hole;

  const isHoleGoingBeyondCeil = gameState.hole.y + step < gameState.hole.points && step < 0;
  const isHoleGoingBelowFloor =
    gameState.hole.y + step > CANVAS_HEIGHT - gameState.hole.points && step > 0;
  const shouldStop = isHoleGoingBeyondCeil || isHoleGoingBelowFloor;

  if (shouldStop) {
    return;
  }

  hole.y += step;
}
