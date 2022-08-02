export interface Configuration {
  tracks: string[];
  shots_per_track: number;
  tentatives_per_shot: number;
  points: number[];
}

export const DEFAULT_CONF = {
  tracks: ["A", "B"],
  shots_per_track: 12,
  tentatives_per_shot: 3,
  points: [22, 20, 16, 16, 14, 10, 10, 8, 4],
};
