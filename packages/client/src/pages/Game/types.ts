export type TDraw = {
  space: (canvasContext: CanvasRenderingContext2D) => void;
  enemies: (canvasContext: CanvasRenderingContext2D) => void;
  hole: (canvasContext: CanvasRenderingContext2D) => void;
};

type TGameEntity = {
  points: number;
  x: number;
  y: number;
};

export type TGameState = {
  hole: TGameEntity;
  enemies: TGameEntity[];
};
