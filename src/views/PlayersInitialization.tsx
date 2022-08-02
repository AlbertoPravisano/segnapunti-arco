import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Form, Grid } from "semantic-ui-react";

import {
  addPlayer,
  changeView,
  Init,
  removeLastPlayer,
} from "../redux/reducer";
import { Player } from "../tools/player";
import { getScoreFromMatches, PlayersHistory, ViewsEnum } from "../tools/match";
import { getHistoryFromStorage } from "../tools/storage";

const PlayersInitialization = () => {
  const players = useSelector((state: Init) => state.players);
  const dispatch = useDispatch();

  const noPlayersInMatch = players.length === 0;

  const onStartNewMatch = () => {
    if (players.length > 0) {
      dispatch(changeView(ViewsEnum.MATCH_STARTED));
    }
  };

  return (
    <React.Fragment>
      <PlayersInMatch
        players={players}
        playersHistory={getHistoryFromStorage()}
      />
      <AddNewPlayer />
      <Button.Group
        title={
          noPlayersInMatch
            ? "Inserisci almeno un giocatore per iniziare la partita"
            : undefined
        }
        floated="right"
      >
        <Button
          negative
          disabled={noPlayersInMatch}
          onClick={() => dispatch(removeLastPlayer())}
        >
          Annulla l'ultimo inserimento
        </Button>
        <Button.Or text="o" />
        <Button primary disabled={noPlayersInMatch} onClick={onStartNewMatch}>
          Inizia partita
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
  return (
    <Grid>
      {players.length > 0 ? (
        <React.Fragment>
          <Grid.Row>
            <Grid.Column width="6">Nome giocatore</Grid.Column>
            <Grid.Column width="4">
              Punteggio totale partite precedenti
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
                  Giocatore {index + 1}:{" "}
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
            Aggiungi
          </Button>
        </Form.Field>
      </Form>
    </React.Fragment>
  );
};
