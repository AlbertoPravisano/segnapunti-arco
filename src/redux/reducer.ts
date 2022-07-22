import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Giocatore, StatoPartita } from "../tools/interfaces";
import { StatoPartitaEnum } from "../tools/statoPartita";

export interface Init {
  statoPartita: StatoPartita;
  giocatori: Giocatore[];
}

const initialState: Init = {
  statoPartita: StatoPartitaEnum.HOME,
  giocatori: [],
};

export const cassaSlice = createSlice({
  name: "gioco",
  initialState,
  reducers: {
    cambiaView: (state, action: PayloadAction<StatoPartita>) => {
      state.statoPartita = action.payload;
    },

    aggiungiGiocatore: (state, action: PayloadAction<string>) => {
      state.giocatori.push({
        nome: action.payload,
        punteggio: 0,
      });
    },
    rimuoviUltimoGiocatore: (state) => {
      state.giocatori.pop();
    },
    aggiungiPunteggioGiocatore: (
      state,
      action: PayloadAction<{ nome: string; punteggio: number }>
    ) => {
      const { nome, punteggio } = action.payload;
      const indexGiocatore = state.giocatori.findIndex((g) => g.nome === nome);
      state.giocatori[indexGiocatore].punteggio += punteggio;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  aggiungiGiocatore,
  rimuoviUltimoGiocatore,
  cambiaView,
  aggiungiPunteggioGiocatore,
} = cassaSlice.actions;

export default cassaSlice.reducer;
