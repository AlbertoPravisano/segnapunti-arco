import React from "react";
import { Tab, Message, Button } from "semantic-ui-react";

import TabellaPunteggi from "../components/TabellaPunteggi";
import {
  CronologiaGiocatori,
  getCronologiaGiocatori,
  getRisultatiGiocatore,
} from "../tools/partita";

const LeaderBoard = () => {
  const [cronologiaGiocatori, setCronologiaGiocatori] =
    React.useState<CronologiaGiocatori>(getCronologiaGiocatori());

  const nessunGiocatorePrecedente = cronologiaGiocatori.length === 0;

  return (
    <React.Fragment>
      {nessunGiocatorePrecedente ? (
        <Message info content="La cronologia delle partite è vuota" />
      ) : (
        <Tab
          panes={cronologiaGiocatori.map((giocatore, index) => {
            return {
              menuItem: giocatore.giocatore,
              key: index,
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
      )}
      <Button
        negative
        onClick={() => {
          localStorage.clear();
          setCronologiaGiocatori([]);
        }}
      >
        Elimina l'intera leaderboard
      </Button>
    </React.Fragment>
  );
};

export default LeaderBoard;
