import * as configuration from "../configuration";

describe("getScoreFromShots", () => {
  it("Valid config", () => {
    const CONFIG = {
      tracks: ["A", "B"],
      shots_per_track: 12,
      tentatives: 3,
      shots_per_tentative: 3,
      points: [22, 20, 16, 16, 14, 10, 10, 8, 4],
      color_selected_cell: "red",
    };
    expect(configuration.isValidConfig(CONFIG)).toEqual(true);
  });

  describe("Not valid config =>", () => {
    it("invalid tentatives", () => {
      const CONFIG = {
        tracks: ["A", "B"],
        shots_per_track: 12,
        tentatives: 2,
        shots_per_tentative: 3,
        points: [22, 20, 16, 16, 14, 10, 10, 8, 4],
        color_selected_cell: "red",
      };
      expect(configuration.isValidConfig(CONFIG)).toEqual(false);
    });

    it("invalid tracks", () => {
      const CONFIG = {
        tracks: ["A", "B", 12],
        shots_per_track: 12,
        tentatives: 3,
        shots_per_tentative: 3,
        points: [22, 20, 16, 16, 14, 10, 10, 8, 4],
        color_selected_cell: "red",
      };
      expect(configuration.isValidConfig(CONFIG)).toEqual(false);
    });

    it("invalid points", () => {
      const CONFIG = {
        tracks: ["A", "B", 12],
        shots_per_track: 12,
        tentatives: 3,
        shots_per_tentative: 3,
        points: [22, 20, 16, 16, 14, 10, 8, 4],
        color_selected_cell: "red",
      };
      expect(configuration.isValidConfig(CONFIG)).toEqual(false);
    });

    it("invalid cell color", () => {
      const CONFIG = {
        tracks: ["A", "B", 12],
        shots_per_track: 12,
        tentatives: 3,
        shots_per_tentative: 3,
        points: [22, 20, 16, 16, 14, 10, 10, 8, 4],
        color_selected_cell: 11,
      };
      expect(configuration.isValidConfig(CONFIG)).toEqual(false);
    });
  });
});
