export interface Configuration {
  tracks: string[];
  shots_per_track: number;
  tentatives: number;
  shots_per_tentative: number;
  points: number[];
}

export const DEFAULT_CONF = {
  tracks: ["A", "B"],
  shots_per_track: 12,
  tentatives: 3,
  shots_per_tentative: 3,
  points: [22, 20, 16, 16, 14, 10, 10, 8, 4],
};

export const isValidConfig = (configuration: Configuration) => {
  const { shots_per_track, tentatives, shots_per_tentative, points } =
    configuration;

  const nPointsEqualsTentatives =
    points.length === shots_per_tentative * tentatives;
  const atLeastOneShot = shots_per_track > 0;

  return nPointsEqualsTentatives && atLeastOneShot;
};
