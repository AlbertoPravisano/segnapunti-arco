import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Form, Grid, Header, Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import {
  addPlayer,
  changeView,
  Init,
  removeLastPlayer,
} from "../redux/reducer";
import { Player } from "../tools/player";
import { getScoreFromMatches, PlayersHistory, ViewsEnum } from "../tools/match";
import { getHistoryFromStorage } from "../api/storage";

const PlayersInitialization = () => {
  const players = useSelector((state: Init) => state.players);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const noPlayersInMatch = players.length === 0;

  const onStartNewMatch = () => {
    if (players.length > 0) {
      dispatch(changeView(ViewsEnum.MATCH_STARTED));
    }
  };

  return (
    <React.Fragment>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>{t("player_initialization.header")}</Header.Content>
      </Header>
      <br />
      <PlayersInMatch
        players={players}
        playersHistory={getHistoryFromStorage()}
      />
      <AddNewPlayer />
      <br />
      <br />
      <br />
      <Button.Group
        vertical
        title={
          noPlayersInMatch
            ? t("player_initialization.error_no_players_inserted")
            : undefined
        }
        floated="right"
      >
        <Button
          negative
          disabled={noPlayersInMatch}
          onClick={() => dispatch(removeLastPlayer())}
        >
          {t("player_initialization.revert_last_insertion")}
        </Button>
        <Button primary disabled={noPlayersInMatch} onClick={onStartNewMatch}>
          {t("common.start_match")}
        </Button>
      </Button.Group>
    </React.Fragment>
  );
};

export default PlayersInitialization;

interface Props {
  players: Player[];
  playersHistory: PlayersHistory;
}

const PlayersInMatch: React.FC<Props> = ({ players, playersHistory }) => {
  const { t } = useTranslation("common");

  return (
    <Grid>
      {players.length > 0 ? (
        <React.Fragment>
          <Grid.Row>
            <Grid.Column width="6">{t("common.player_name")}</Grid.Column>
            <Grid.Column width="4">
              {t("player_initialization.total_score_old_matches")}
            </Grid.Column>
          </Grid.Row>
          {players.map((player, index) => {
            const indexPlayer = playersHistory.findIndex(
              (playerHistory) => playerHistory.playerName === player.name
            );
            const totalHistoryScore =
              indexPlayer > -1
                ? getScoreFromMatches(playersHistory[indexPlayer].matches)
                : 0;
            return (
              <Grid.Row key={index}>
                <Grid.Column width="6">
                  {t("common.player")} {index + 1}:{" "}
                  <Input transparent readOnly value={player.name} />
                </Grid.Column>

                <Grid.Column width="4">{totalHistoryScore}</Grid.Column>
              </Grid.Row>
            );
          })}
        </React.Fragment>
      ) : (
        <Grid.Row />
      )}
    </Grid>
  );
};

const AddNewPlayer = () => {
  const [name, setName] = React.useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const nameInserted = name.length > 0;

  return (
    <React.Fragment>
      <Form
        onSubmit={() => {
          if (nameInserted) {
            dispatch(addPlayer(name));
            setName("");
          }
        }}
      >
        <Form.Field inline>
          <Input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Button disabled={!nameInserted} type="submit">
            {t("common.add")}
          </Button>
        </Form.Field>
      </Form>
    </React.Fragment>
  );
};
