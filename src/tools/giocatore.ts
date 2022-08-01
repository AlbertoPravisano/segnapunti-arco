import { Tiro } from "./tiro";

export interface Giocatore {
  nome: string;
  tiri: Tiro[];
}

export const getTiriTracciato = (giocatore: Giocatore, tracciato: string) => {
  return giocatore.tiri.filter((tiro) => tiro.tracciato === tracciato);
};

export const calcolaRisultatoFinaleGiocatore = (giocatore: Giocatore) => {
  let totale = 0;
  giocatore.tiri.forEach((tiro) => (totale += tiro.punteggio));
  return totale;
};
