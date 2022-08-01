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

interface Partita {
  punteggio: number;
  data: string;
}

export interface RisultatiGiocatore {
  giocatore: string;
  partite: Partita[];
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

export const calcolaPunteggioTotale = (partite: Partita[]) => {
  let totale = 0;
  partite.forEach((partita) => (totale += partita.punteggio));
  return totale;
};

export const getCronologiaGiocatori: () => CronologiaGiocatori = () => {
  const cronologia = localStorage.getItem("cronologia");
  return cronologia ? JSON.parse(cronologia) : [];
};
