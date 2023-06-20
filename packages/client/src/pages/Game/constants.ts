import Enemy_sprite from '../../assets/images/enemy_1.png';
import Background from '../../assets/images/game_bg.jpg';
import Hole_sprite from '../../assets/images/hole.webp';

export const NAVBAR_HEIGHT = 80;
export const CANVAS_WIDTH = window.innerWidth;
export const CANVAS_HEIGHT = window.innerHeight - NAVBAR_HEIGHT;
export const MAX_RATIO = 0.33;
export const MIN_RATIO = 0.2;
export const MAX_RADIUS = CANVAS_HEIGHT * MAX_RATIO;
export const MIN_RADIUS = CANVAS_HEIGHT * MIN_RATIO;
export const HOLE_RADIUS = CANVAS_WIDTH * 0.1;
export const MIN_NUMBER_OF_ENEMIES = 5;
export const MIN_RATIO_TO_HOLE = 0.4;
export const MAX_RATIO_TO_HOLE = 2.25;
export const HOLE_RADIUSES_PADDING = 4;

export const MOVE_STEP = 10;
export const GAME_ENTITY_FONT = '16px Comic Sans MS';

export const assets = {
  hole: Hole_sprite,
  background: Background,
  enemy: Enemy_sprite,
};

export enum Color {
  ENEMY_POINTS_TEXT = 'red',
  HERO_POINTS_TEXT = 'white',
}
