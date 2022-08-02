import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Player } from "../tools/player";
import { ViewsEnum, View } from "../tools/match";
import { Shot } from "../tools/shot";
import { Configuration, DEFAULT_CONF } from "../tools/configuration";

export interface Init {
  view: View;
  players: Player[];
  configuration: Configuration;
}

const initialState: Init = {
  view: ViewsEnum.HOME,
  players: [],
  configuration: DEFAULT_CONF,
};

export const cassaSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    changeView: (state, action: PayloadAction<View>) => {
      state.view = action.payload;
    },
    changeConfiguration: (state, action: PayloadAction<Configuration>) => {
      state.configuration = action.payload;
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
  changeConfiguration,
  addShotToPlayer,
} = cassaSlice.actions;

export default cassaSlice.reducer;
