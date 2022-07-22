import { StatoPartitaEnum } from "./statoPartita";

export const NUMERO_TIRI = 12;

export interface Tiro {
  id: number;
  tracciato: string;
  tentativo: number;
  punteggio: number;
}

export interface Giocatore {
  nome: string;
  tiri: Tiro[];
}

export type StatoPartita = keyof typeof StatoPartitaEnum;

export interface PartitaInCorsoGiocatore {
  giocatore: string;
  punteggio: number;
  data: string;
}

export interface RisultatiGiocatore {
  giocatore: string;
  partite: {
    punteggio: number;
    data: string;
  }[];
}

export type CronologiaGiocatori = RisultatiGiocatore[];

export const getRisultatiGiocatore = (
  nomeGiocatore: string,
  cronologiaGioco: CronologiaGiocatori
) => {
  return cronologiaGioco.filter(
    (risultatiGiocatore) => risultatiGiocatore.giocatore === nomeGiocatore
  )[0];
};

export const getTiriTracciato = (giocatore: Giocatore, tracciato: string) => {
  return giocatore.tiri.filter((tiro) => tiro.tracciato === tracciato);
};

export const calcolaRisultatoFinaleGiocatore = (giocatore: Giocatore) => {
  let totale = 0;
  giocatore.tiri.forEach((tiro) => (totale += tiro.punteggio));
  return totale;
};
