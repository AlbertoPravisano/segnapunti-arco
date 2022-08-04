import React from "react";
import { useTranslation } from "react-i18next";
import { Tab, Message, Header, Icon } from "semantic-ui-react";

import ConfirmButton from "../components/buttons/ConfirmButton";
import NavButton from "../components/buttons/NavButton";
import TablePlayerHistory from "../components/tables/TablePlayerHistory";
import { ViewsEnum } from "../tools/match";
import { getHistoryFromStorage } from "../api/storage";

const LeaderBoard = () => {
  const [playersHistory, setPlayersHistory] = React.useState(
    getHistoryFromStorage()
  );
  const { t } = useTranslation("common");

  const isLeaderboardEmpty = playersHistory.length === 0;

  return (
    <React.Fragment>
      <Header as="h2">
        <Icon name="gem" />
        <Header.Content>{t("leaderboard.header")}</Header.Content>
      </Header>
      <br />
      {isLeaderboardEmpty ? (
        <React.Fragment>
          <Message info content={t("leaderboard.empty_leaderboard")} />
          <NavButton primary view={ViewsEnum.PLAYERS_INITIALIZATION}>
            {t("common.start_match")}
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
            {t("leaderboard.delete_leaderboard")}
          </ConfirmButton>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LeaderBoard;
