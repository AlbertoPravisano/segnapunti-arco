import * as shot from "../shot";

describe("getScoreFromShots", () => {
  it("One value", () => {
    const SCORE = 22;
    const SHOT = {
      id: 0,
      track: "A",
      tentative: 0,
      score: SCORE,
    };
    expect(shot.getScoreFromShots([SHOT])).toEqual(SCORE);
  });

  it("More values", () => {
    const SHOT1 = {
      id: 0,
      track: "A",
      tentative: 0,
      score: 22,
    };
    const SHOT2 = {
      id: 1,
      track: "A",
      tentative: 2,
      score: 4,
    };
    const SHOT3 = {
      id: 0,
      track: "B",
      tentative: 0,
      score: 16,
    };
    expect(shot.getScoreFromShots([SHOT1, SHOT2, SHOT3])).toEqual(42);
  });
});
