import { StatoPartitaEnum } from "./statoPartita";

export interface Giocatore {
  nome: string;
  punteggio: number;
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
