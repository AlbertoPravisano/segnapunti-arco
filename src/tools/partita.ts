export enum StatoPartitaEnum {
  HOME = "HOME",
  INIZIALIZZAZIONE_GIOCATORI = "INIZIALIZZAZIONE_GIOCATORI",
  PARTITA_IN_CORSO = "PARTITA_IN_CORSO",
  PARTITA_CONCLUSA = "PARTITA_CONCLUSA",
  PUNTEGGI_PARTITE_PRECEDENTI = "PUNTEGGI_PARTITE_PRECEDENTI",
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
