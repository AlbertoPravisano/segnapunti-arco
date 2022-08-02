export enum ViewsEnum {
  HOME = "HOME",
  PLAYERS_INITIALIZATION = "PLAYERS_INITIALIZATION",
  MATCH_STARTED = "MATCH_STARTED",
  RESULTS_MATCH = "RESULTS_MATCH",
  LEADERBOARD = "LEADERBOARD",
}

interface Match {
  points: number;
  date: string;
}

export interface PlayerHistory {
  playerName: string;
  matches: Match[];
}

export type View = keyof typeof ViewsEnum;
export type PlayersHistory = PlayerHistory[];

export const getPlayerHistory = (
  playerName: string,
  playersHistory: PlayersHistory
) => {
  return playersHistory.filter(
    (playerHistory) => playerHistory.playerName === playerName
  )[0];
};

export const getScoreFromMatches = (matches: Match[]) => {
  let score = 0;
  matches.forEach((match) => (score += match.points));
  return score;
};
