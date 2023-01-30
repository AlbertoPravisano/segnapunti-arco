import { Shot } from "./shot";

export interface Player {
  name: string;
  shots: Shot[];
}

export const getShotsByTrack = (player: Player, track: string) =>
  player.shots.filter((shot) => shot.track === track);
