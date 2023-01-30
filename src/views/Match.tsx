import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Icon } from "semantic-ui-react";

import { addShotToPlayer, changeView, Init } from "../redux/reducer";
import { ViewsEnum } from "../tools/match";
import NavButton from "../components/buttons/NavButton";
import { useTranslation } from "react-i18next";
import Target from "../components/vectorial/Target";
import { Player } from "../tools/player";

const MISS = -1;

const splitShotsByTentatives = (points: number[] = [], tentatives: number) => {
  let arrays = [];
  let pointsToSplit = [...points];
  while (pointsToSplit.length > 0) {
    arrays.push(pointsToSplit.splice(0, tentatives));
  }
  return arrays;
};

const calculateScore = (
  shot: number,
  tentative: number,
  tentatives: number,
  shotsSplitted: number[][]
) => (tentative < tentatives ? shotsSplitted[tentative][shot] : 0);

const Match = () => {
  const { t } = useTranslation("common");
  const { players, configuration } = useSelector((state: Init) => state);
  const dispatch = useDispatch();
  const { tracks, tentatives, points, shots_per_track } = configuration;
  const [tentative, setTentative] = React.useState(0);
  const [state, setState] = React.useState({
    currentPlayer: 0,
    idShot: 0,
    idTrack: 0,
  });
  const nTracks = tracks.length;
  const nPlayers = players.length;
  const pointsSplitted = splitShotsByTentatives(points, tentatives);

  const onSetScore = (
    player: Player,
    idShot: number,
    track: string,
    score: number
  ) => {
    if (score === MISS) {
      if (tentative + 1 < tentatives) {
        setTentative(tentative + 1);
      } else {
        dispatch(
          addShotToPlayer({
            name: player.name,
            shot: {
              id: idShot,
              track,
              tentative: tentative + 1,
              score: 0,
            },
          })
        );
        setTentative(0);
      }
    } else {
      dispatch(
        addShotToPlayer({
          name: player.name,
          shot: {
            id: idShot,
            track,
            tentative: tentative + 1,
            score: calculateScore(score, tentative, tentatives, pointsSplitted),
          },
        })
      );
      setTentative(0);
    }

    // Cambio giocatore/tiro/traccia se ho aggiornato lo shot del giocatore attuale
    if (score !== MISS || (score === MISS && tentative + 1 === tentatives)) {
      let newState = { ...state };
      if (state.currentPlayer + 1 === nPlayers) {
        newState.currentPlayer = 0;
        if (state.idShot + 1 === shots_per_track) {
          newState.idShot = 0;
          newState.idTrack = newState.idTrack + 1;
        } else {
          newState.idShot = newState.idShot + 1;
        }
      } else {
        newState.currentPlayer = newState.currentPlayer + 1;
      }
      setState({ ...newState });
    }
  };

  // If everyone shot all the targets, move automatically to Results
  React.useEffect(() => {
    const TOTAL_SHOTS_MATCH = shots_per_track * players.length * nTracks;
    const nShots = players.reduce(
      (total, currentPlayer) => (total += currentPlayer.shots.length),
      0
    );

    if (nShots === TOTAL_SHOTS_MATCH) {
      dispatch(changeView(ViewsEnum.RESULTS_MATCH));
    }
  }, [dispatch, players, shots_per_track, nTracks]);

  return (
    <React.Fragment>
      <Header as="h2" floated="left">
        <Icon name="bolt" />
        <Header.Content>{t("match.header")}</Header.Content>
      </Header>
      <NavButton
        icon
        labelPosition="right"
        floated="right"
        view={ViewsEnum.RESULTS_MATCH}
      >
        {t("match.go_to_results")} <Icon name="mail forward" />
      </NavButton>
      <br />
      <br />
      <br />
      {Array.from({ length: nTracks }, (_, indexTrack) => {
        return Array.from({ length: shots_per_track }, (_, indexShot) => {
          return (
            <React.Fragment key={`${indexTrack}-${indexShot}`}>
              {players.map((player, indexCurrentPlayer) => {
                return (
                  <React.Fragment key={indexCurrentPlayer}>
                    {state.idShot === indexShot &&
                      state.idTrack === indexTrack &&
                      state.currentPlayer === indexCurrentPlayer && (
                        <React.Fragment>
                          Ci troviamo nella traccia {tracks[indexTrack]}, tiro{" "}
                          {indexShot + 1} su {shots_per_track}. <br />
                          Il giocatore <strong>{player.name}</strong> deve
                          tirare (tentativo {tentative + 1}/{tentatives}):{" "}
                          <Target
                            setScore={(score) =>
                              onSetScore(
                                player,
                                indexShot,
                                tracks[indexTrack],
                                score
                              )
                            }
                          />
                        </React.Fragment>
                      )}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        });
      })}
    </React.Fragment>
  );
};

export default Match;
