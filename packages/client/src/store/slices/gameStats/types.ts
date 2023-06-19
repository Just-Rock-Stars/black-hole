export type TGameState = {
  gameDuration: number | null;
  points: number | null;
  maxSize: number | null;
  consumedEnemies: number | null;
};

export type TSetGameStatsPayload = {
  gameDuration: number;
  points: number;
  maxPoints: number;
  consumedEnemies: number;
};
