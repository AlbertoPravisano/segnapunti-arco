import React from "react";
import { Tab, Message } from "semantic-ui-react";

import ConfirmButton from "../components/ConfirmButton";
import NavButton from "../components/NavButton";
import TablePlayerHistory from "../components/TablePlayerHistory";
import { ViewsEnum } from "../tools/match";
import { getHistoryFromStorage } from "../tools/storage";

const LeaderBoard = () => {
  const [playersHistory, setPlayersHistory] = React.useState(
    getHistoryFromStorage()
  );

  const isLeaderboardEmpty = playersHistory.length === 0;

  return (
    <React.Fragment>
      {isLeaderboardEmpty ? (
        <React.Fragment>
          <Message info content="La cronologia delle partite è vuota" />
          <NavButton primary view={ViewsEnum.PLAYERS_INITIALIZATION}>
            Inizia una partita
          </NavButton>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Tab
            panes={playersHistory.map((playerHistory) => {
              return {
                menuItem: playerHistory.playerName,
                render: () => (
                  <TablePlayerHistory playerHistory={playerHistory} />
                ),
              };
            })}
          />
          <ConfirmButton
            negative
            onConfirm={() => {
              localStorage.clear();
              setPlayersHistory([]);
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
