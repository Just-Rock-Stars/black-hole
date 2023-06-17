export const NAVBAR_HEIGHT = 80;
export const CANVAS_WIDTH = window.innerWidth;
export const CANVAS_HEIGHT = window.innerHeight - NAVBAR_HEIGHT;
export const MAX_RATIO = 0.33;
export const MIN_RATIO = 0.2;
export const MAX_RADIUS = CANVAS_HEIGHT * MAX_RATIO;
export const MIN_RADIUS = CANVAS_HEIGHT * MIN_RATIO;

export const MOVE_STEP = 10;
export const GAME_ENTITY_FONT = '16px Comic Sans MS';

export enum Color {
  ENEMY_ASTEROID_BODY = 'lightgray',
  ENEMY_POINTS_TEXT = 'red',
  HERO_BODY = 'black',
  HERO_POINTS_TEXT = 'green',
}
