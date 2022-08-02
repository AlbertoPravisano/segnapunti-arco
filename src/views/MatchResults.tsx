import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Icon, Message } from "semantic-ui-react";

import NavButton from "../components/buttons/NavButton";
import { Init, cleanMatch } from "../redux/reducer";
import { formatDateDDMMYYYY } from "../tools/dateUtils";
import { ViewsEnum } from "../tools/match";
import { getScoreFromShots, Shot } from "../tools/shot";
import { getHistoryFromStorage, setHistoryToStorage } from "../tools/storage";

const getMatchCurrentPlayer = (shots: Shot[]) => ({
  points: getScoreFromShots(shots),
  date: formatDateDDMMYYYY(new Date()),
});

const MatchResults = () => {
  const players = useSelector((state: Init) => state.players);
  const [isResultsSaved, setIsResultsSaved] = React.useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const onHandleSaveResults = () => {
    const oldPlayersHistory = getHistoryFromStorage();
    let newPlayersHistory = oldPlayersHistory;

    if (oldPlayersHistory.length === 0) {
      newPlayersHistory = players.map((player) => ({
        playerName: player.name,
        matches: [getMatchCurrentPlayer(player.shots)],
      }));
    } else {
      players.forEach((currentPlayerInMatch) => {
        const matchPlayer = getMatchCurrentPlayer(currentPlayerInMatch.shots);
        const idexPlayerInHistory = newPlayersHistory.findIndex(
          (player) => player.playerName === currentPlayerInMatch.name
        );
        if (idexPlayerInHistory > -1) {
          newPlayersHistory[idexPlayerInHistory].matches.push(matchPlayer);
        } else {
          newPlayersHistory.push({
            playerName: currentPlayerInMatch.name,
            matches: [matchPlayer],
          });
        }
      });
    }

    setHistoryToStorage(newPlayersHistory);
    setIsResultsSaved(true);
  };

  return (
    <React.Fragment>
      <Grid>
        {players.map((player, index) => {
          return (
            <Grid.Row key={index}>
              <Grid.Column>{player.name}</Grid.Column>
              <Grid.Column>{getScoreFromShots(player.shots)}</Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
      <br />
      <Button.Group>
        <NavButton icon labelPosition="left" view={ViewsEnum.MATCH_STARTED}>
          {t("results.return_to_match")} <Icon name="reply" />
        </NavButton>
        <Button.Or text="o" />
        <Button negative floated="right" onClick={() => dispatch(cleanMatch())}>
          {t("results.start_new_game")}
        </Button>
        <Button.Or text="o" />
        <Button primary floated="right" onClick={onHandleSaveResults}>
          {t("results.save_results")}
        </Button>
      </Button.Group>
      {isResultsSaved && (
        <Message info>
          <Grid>
            <Grid.Column width="8">
              <Message.Header>{t("results.results_saved")}</Message.Header>
            </Grid.Column>
            <Grid.Column width="8">
              <NavButton floated="right" view={ViewsEnum.LEADERBOARD}>
                {t("results.go_to_leaderboard")}
              </NavButton>
            </Grid.Column>
          </Grid>
        </Message>
      )}
    </React.Fragment>
  );
};

export default MatchResults;
