import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Header, Icon, Message, Modal } from "semantic-ui-react";

import NavButton from "../components/buttons/NavButton";
import { Init, cleanMatch } from "../redux/reducer";
import { formatDateDDMMYYYY } from "../tools/dateUtils";
import { ViewsEnum } from "../tools/match";
import { getScoreFromShots, Shot } from "../tools/shot";
import { getHistoryFromStorage, setHistoryToStorage } from "../api/storage";
import TablePlayerMatch from "../components/tables/TablePlayerMatch";
import { getShotsByTrack, Player } from "../tools/player";
import { Configuration } from "../tools/configuration";

const getMatchCurrentPlayer = (shots: Shot[]) => ({
  points: getScoreFromShots(shots),
  date: formatDateDDMMYYYY(new Date()),
});

const MatchResults = () => {
  const { players, configuration } = useSelector((state: Init) => state);
  const [isResultsSaved, setIsResultsSaved] = React.useState(false);
  const [playerDetails, setPlayerDetails] = React.useState<Player>();
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
      <Grid>
        <Grid.Row>
          <Grid.Column width="3">
            <strong>{t("common.player_name")}</strong>
          </Grid.Column>
          <Grid.Column width="3">
            <strong>{t("common.total")}</strong>
          </Grid.Column>
          <Grid.Column width="3">
            <strong>{t("results.details")}</strong>
          </Grid.Column>
        </Grid.Row>
        {players.map((player, index) => (
          <Grid.Row key={index} verticalAlign="middle">
            <Grid.Column width="3">{player.name}</Grid.Column>
            <Grid.Column width="3">
              {getScoreFromShots(player.shots)}
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Button
                data-tooltip={t("results.details")}
                icon
                circular
                onClick={() => setPlayerDetails(player)}
              >
                <Icon name="table" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        ))}
        {playerDetails &&
          renderModal(
            playerDetails,
            configuration,
            t("common.track"),
            t("common.total"),
            setPlayerDetails
          )}
      </Grid>
      <br />
      <Button.Group vertical floated="right">
        <Button negative floated="right" onClick={() => dispatch(cleanMatch())}>
          {t("results.start_new_game")}
        </Button>
        <Button primary floated="right" onClick={onHandleSaveResults}>
          {t("results.save_results")}
        </Button>
      </Button.Group>
      {isResultsSaved &&
        renderMessageLeaderboard(
          t("results.results_saved"),
          t("results.go_to_leaderboard")
        )}
    </React.Fragment>
  );
};

export default MatchResults;

const renderModal = (
  player: Player,
  configuration: Configuration,
  textTrack: string,
  textTotal: string,
  setPlayerDetails: (player?: Player) => void
) => {
  return (
    <Modal open closeIcon onClose={() => setPlayerDetails(undefined)}>
      <Modal.Header>Dettagli di {player.name}</Modal.Header>
      <Modal.Content scrolling>
        {configuration.tracks.map((track, index) => (
          <React.Fragment key={`${track}${index}`}>
            {textTrack} {track}: {textTotal.toLowerCase()}{" "}
            {getScoreFromShots(getShotsByTrack(player, track))}
            <TablePlayerMatch
              player={player}
              configuration={configuration}
              track={track}
              readOnly
            />
          </React.Fragment>
        ))}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setPlayerDetails(undefined)}>Chiudi</Button>
      </Modal.Actions>
    </Modal>
  );
};

const renderMessageLeaderboard = (
  stringResultSaved: string,
  stringGoToLeaderboard: string
) => {
  return (
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
            <Message.Header>{stringResultSaved}</Message.Header>
          </Grid.Column>
          <Grid.Column width="8">
            <NavButton floated="right" view={ViewsEnum.LEADERBOARD}>
              {stringGoToLeaderboard}
            </NavButton>
          </Grid.Column>
        </Grid>
      </Message>
    </React.Fragment>
  );
};
