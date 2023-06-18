export type TDraw = {
  space: (canvasContext: CanvasRenderingContext2D) => void;
  enemies: (canvasContext: CanvasRenderingContext2D) => void;
  hole: (canvasContext: CanvasRenderingContext2D) => void;
};

export type TGameEntity = {
  points: number;
  x: number;
  y: number;
};

type TEnemyProperties = {
  isVisible: boolean;
  radius: number;
};

export type TEnemy = TGameEntity & TEnemyProperties;

export type TGameState = {
  currentScreen: number;
  hole: TGameEntity;
  enemies: TEnemy[];
};
