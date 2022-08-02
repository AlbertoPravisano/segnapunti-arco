import React from "react";
import { Tab, Message } from "semantic-ui-react";

import ConfirmButton from "../components/ConfirmButton";
import NavButton from "../components/NavButton";
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
        <React.Fragment>
          <Message info content="La cronologia delle partite è vuota" />
          <NavButton primary view="INIZIALIZZAZIONE_GIOCATORI">
            Inizia una partita
          </NavButton>
        </React.Fragment>
      ) : (
        <React.Fragment>
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
          <ConfirmButton
            negative
            onConfirm={() => {
              localStorage.clear();
              setCronologiaGiocatori([]);
            }}
          >
            Elimina l'intera leaderboard
          </ConfirmButton>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LeaderBoard;
