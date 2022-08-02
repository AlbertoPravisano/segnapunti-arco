export const NUMBER_OF_TARGETS_PER_TRACK = 12;

export interface Shot {
  id: number;
  track: string;
  tentative: number;
  score: number;
}

export const getScoreFromShots = (shots: Shot[]) => {
  let score = 0;
  shots.forEach((shot) => (score += shot.score));
  return score;
};
