import { TGameEntity } from './types';

export function doOverlap({
  en1,
  en2,
  radius1,
  radius2,
}: {
  en1: TGameEntity;
  en2: TGameEntity;
  radius1: number;
  radius2: number;
}) {
  const { x: x1, y: y1 } = en1;
  const { x: x2, y: y2 } = en2;

  const xDistSquare = (x2 - x1) ** 2;
  const yDistSquare = (y2 - y1) ** 2;

  const distanceBetweenCenters = Math.sqrt(xDistSquare + yDistSquare);

  const sumOfRadiuses = radius1 + radius2;

  return sumOfRadiuses >= distanceBetweenCenters;
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
