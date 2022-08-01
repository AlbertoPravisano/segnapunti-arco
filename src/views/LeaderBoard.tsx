import React from "react";
import { Tab } from "semantic-ui-react";

import TabellaPunteggi from "../components/TabellaPunteggi";
import { getRisultatiGiocatore } from "../tools/partita";

const giocatore1 = {
  giocatore: "pippo",
  partite: [
    { punteggio: 400, data: "29/07/2022" },
    { punteggio: 400, data: "22/07/2022" },
  ],
};
const giocatore2 = {
  giocatore: "pluto",
  partite: [
    { punteggio: 380, data: "22/07/2022" },
    { punteggio: 380, data: "29/07/2022" },
  ],
};

const LeaderBoard = () => {
  const cronologiaGiocatori = [giocatore1, giocatore2];

  return (
    <Tab
      panes={cronologiaGiocatori.map((giocatore) => {
        return {
          menuItem: giocatore.giocatore,
          render: () => (
            <TabellaPunteggi
              risultatiGiocatore={getRisultatiGiocatore(
                giocatore.giocatore,
                cronologiaGiocatori
              )}
            />
          ),
        };
      })}
    />
  );
};

export default LeaderBoard;
