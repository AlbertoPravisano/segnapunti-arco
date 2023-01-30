import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Message,
  Tab,
} from "semantic-ui-react";

import NavButton from "../components/buttons/NavButton";
import { Init, cleanMatch } from "../redux/reducer";
import { formatDateDDMMYYYY } from "../tools/dateUtils";
import { ViewsEnum } from "../tools/match";
import { getScoreFromShots, Shot } from "../tools/shot";
import { getHistoryFromStorage, setHistoryToStorage } from "../api/storage";
import TablePlayerMatch from "../components/tables/TablePlayerMatch";
import { getShotsByTrack } from "../tools/player";

const getMatchCurrentPlayer = (shots: Shot[]) => ({
  points: getScoreFromShots(shots),
  date: formatDateDDMMYYYY(new Date()),
});

const MatchResults = () => {
  const { players, configuration } = useSelector((state: Init) => state);
  const [isResultsSaved, setIsResultsSaved] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
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
      <Header as="h2" floated="left">
        <Icon name="numbered list" />
        <Header.Content>{t("results.header")}</Header.Content>
      </Header>
      <NavButton
        icon
        labelPosition="left"
        floated="right"
        view={ViewsEnum.MATCH_STARTED}
      >
        {t("results.return_to_match")} <Icon name="reply" />
      </NavButton>
      <br />
      <br />
      <br />
      <br />
      <Checkbox
        toggle
        label="Mostra dettagli"
        onChange={() => setShowDetails(!showDetails)}
      />
      <br />
      <br />
      {showDetails && (
        <Tab
          panes={players.map((player, index) => ({
            menuItem: player.name,
            render: () => (
              <React.Fragment key={index}>
                <br />
                {configuration.tracks.map((track, index) => (
                  <React.Fragment key={`${track}${index}`}>
                    {t("common.track")} {track}:{" "}
                    {t("common.total").toLowerCase()}{" "}
                    {getScoreFromShots(getShotsByTrack(player, track))}
                    <TablePlayerMatch
                      player={player}
                      configuration={configuration}
                      track={track}
                      readOnly
                    />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ),
          }))}
        />
      )}
      {!showDetails && (
        <Grid>
          {players.map((player, index) => {
            return (
              <Grid.Row key={index}>
                <Grid.Column width="3">{player.name}</Grid.Column>
                <Grid.Column width="3">
                  {getScoreFromShots(player.shots)}
                </Grid.Column>
              </Grid.Row>
            );
          })}
        </Grid>
      )}
      <br />
      <Button.Group vertical floated="right">
        <Button negative floated="right" onClick={() => dispatch(cleanMatch())}>
          {t("results.start_new_game")}
        </Button>
        <Button primary floated="right" onClick={onHandleSaveResults}>
          {t("results.save_results")}
        </Button>
      </Button.Group>
      {isResultsSaved && (
        <React.Fragment>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Message info>
            <Grid stackable>
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
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MatchResults;
