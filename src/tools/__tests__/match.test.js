import * as match from "../match";

describe("getMediumScore", () => {
  it("Empty value", () => {
    expect(match.getMediumScore()).toEqual(0);
  });

  it("One value", () => {
    expect(match.getMediumScore([{ points: 200, date: Date.now() }])).toEqual(
      200
    );
  });

  it("More values", () => {
    expect(
      match.getMediumScore([
        { points: 200, date: Date.now() },
        { points: 200, date: Date.now() },
        { points: 500, date: Date.now() },
      ])
    ).toEqual(300);
  });
});
