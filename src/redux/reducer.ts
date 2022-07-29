import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Giocatore, StatoPartita, Tiro } from "../tools/interfaces";
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
        tiri: [],
      });
    },
    rimuoviUltimoGiocatore: (state) => {
      state.giocatori.pop();
    },
    resettaStatoPartita: (state) => {
      state.giocatori = [];
      state.statoPartita = StatoPartitaEnum.INIZIALIZZAZIONE_GIOCATORI;
    },
    aggiungiTiroGiocatore: (
      state,
      action: PayloadAction<{ nome: string; tiro: Tiro }>
    ) => {
      const { nome, tiro } = action.payload;
      const indexGiocatore = state.giocatori.findIndex((g) => g.nome === nome);
      const indexTiroModificato = state.giocatori[
        indexGiocatore
      ].tiri.findIndex(
        (tiroGiocatore) =>
          tiroGiocatore.id === tiro.id &&
          tiroGiocatore.tracciato === tiro.tracciato
      );
      if (indexTiroModificato > -1) {
        state.giocatori[indexGiocatore].tiri[indexTiroModificato].punteggio =
          tiro.punteggio;
        state.giocatori[indexGiocatore].tiri[indexTiroModificato].tentativo =
          tiro.tentativo;
      } else {
        state.giocatori[indexGiocatore].tiri.push(tiro);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  aggiungiGiocatore,
  rimuoviUltimoGiocatore,
  resettaStatoPartita,
  cambiaView,
  aggiungiTiroGiocatore,
} = cassaSlice.actions;

export default cassaSlice.reducer;
