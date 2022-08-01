export const NUMERO_TIRI = 12;

export interface Tiro {
  id: number;
  tracciato: string;
  tentativo: number;
  punteggio: number;
}

export const getPunteggioTracciato = (tiri: Tiro[]) => {
  let punteggio = 0;
  tiri.forEach((tiro) => (punteggio += tiro.punteggio));
  return punteggio;
};
