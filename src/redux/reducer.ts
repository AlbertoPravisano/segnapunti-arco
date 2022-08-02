import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Player } from "../tools/player";
import { ViewsEnum, View } from "../tools/match";
import { Shot } from "../tools/shot";

export interface Init {
  view: View;
  players: Player[];
}

const initialState: Init = {
  view: ViewsEnum.HOME,
  players: [],
};

export const cassaSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    changeView: (state, action: PayloadAction<View>) => {
      state.view = action.payload;
    },

    addPlayer: (state, action: PayloadAction<string>) => {
      state.players.push({
        name: action.payload,
        shots: [],
      });
    },
    removeLastPlayer: (state) => {
      state.players.pop();
    },
    cleanMatch: (state) => {
      state.players = [];
      state.view = ViewsEnum.PLAYERS_INITIALIZATION;
    },
    addShotToPlayer: (
      state,
      action: PayloadAction<{ name: string; shot: Shot }>
    ) => {
      const { name, shot } = action.payload;
      const indexPlayer = state.players.findIndex((g) => g.name === name);
      const indexShotChanged = state.players[indexPlayer].shots.findIndex(
        (shotPlayer) =>
          shotPlayer.id === shot.id && shotPlayer.track === shot.track
      );
      if (indexShotChanged > -1) {
        state.players[indexPlayer].shots[indexShotChanged].score = shot.score;
        state.players[indexPlayer].shots[indexShotChanged].tentative =
          shot.tentative;
      } else {
        state.players[indexPlayer].shots.push(shot);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addPlayer,
  removeLastPlayer,
  cleanMatch,
  changeView,
  addShotToPlayer,
} = cassaSlice.actions;

export default cassaSlice.reducer;
