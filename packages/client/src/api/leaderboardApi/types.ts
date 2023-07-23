export type TGetLeaderBoard = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type TSaveResult = {
  data: {
    userDisplayName: string;
    userID: number;
    userAvatar: string;
    score: number;
    consumedEnemies: number;
  };
  ratingFieldName: string;
  teamName: string;
};
