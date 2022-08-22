export interface Configuration {
  tracks: string[];
  shots_per_track: number;
  tentatives: number;
  shots_per_tentative: number;
  points: number[];
  color_selected_cell: string;
}

export const DEFAULT_CONF = {
  tracks: ["A", "B"],
  color_selected_cell: "Cyan",
  shots_per_track: 12,
  tentatives: 3,
  shots_per_tentative: 3,
  points: [22, 20, 16, 16, 14, 10, 10, 8, 4],
};

const elementIsArrayOfType = (element: any, type: "string" | "number") => {
  return Array.isArray(element) && element.every((t: any) => typeof t === type);
};

export const isValidTracksConfig = (tracks: any) =>
  elementIsArrayOfType(tracks, "string");

export const isValidShotsPerTrackConfig = (shotsPerTrack: any) =>
  shotsPerTrack > 0 && typeof shotsPerTrack === "number";

export const isValidPointsAndTentativesConfig = (
  points: any,
  shotsPerTentative: any,
  tentatives: any
) =>
  elementIsArrayOfType(points, "number") &&
  points.length === shotsPerTentative * tentatives;

export const isValidConfig = (configuration: Configuration) => {
  const { tracks, shots_per_track, tentatives, shots_per_tentative, points } =
    configuration;
  return (
    isValidTracksConfig(tracks) &&
    isValidShotsPerTrackConfig(shots_per_track) &&
    isValidPointsAndTentativesConfig(points, shots_per_tentative, tentatives)
  );
};
