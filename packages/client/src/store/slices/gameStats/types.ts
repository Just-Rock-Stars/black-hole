export type TGameState = {
  playTime: number | null;
  points: number | null;
  maxSize: number | null;
  consumedEnemies: number | null;
};

export type TSetGameStatsPayload = {
  playTime: number;
  points: number;
  maxSize: number;
  consumedEnemies: number;
};
