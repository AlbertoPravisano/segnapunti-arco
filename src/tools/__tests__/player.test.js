import * as player from "../player";

describe("getShotsByTrack", () => {
  it("One track, one shot", () => {
    const TRACK = "A";
    const shotsTrackA = [
      {
        id: 0,
        track: TRACK,
        tentative: 0,
        score: 22,
      },
    ];
    expect(
      player.getShotsByTrack(
        {
          name: "pippo",
          shots: shotsTrackA,
        },
        TRACK
      )
    ).toEqual(shotsTrackA);
  });

  it("More tracks, more shots", () => {
    const TRACK = "A";
    const shotsTrackA = [
      {
        id: 0,
        track: TRACK,
        tentative: 0,
        score: 22,
      },
      {
        id: 3,
        track: TRACK,
        tentative: 0,
        score: 16,
      },
      {
        id: 4,
        track: TRACK,
        tentative: 0,
        score: 16,
      },
    ];
    const shotsTrackB = [
      {
        id: 1,
        track: "B",
        tentative: 1,
        score: 16,
      },
      {
        id: 2,
        track: "B",
        tentative: 2,
        score: 10,
      },
      {
        id: 5,
        track: "B",
        tentative: 3,
        score: 0,
      },
    ];
    expect(
      player.getShotsByTrack(
        {
          name: "pippo",
          shots: [...shotsTrackA, ...shotsTrackB],
        },
        TRACK
      )
    ).toEqual(shotsTrackA);
  });
});
