export interface ILeadersListItem {
  data: {
    userID: number;
    userDisplayName: string;
    userAvatar: string | null;
    score: number;
    consumedEnemies: number;
  };
  place: number;
}
