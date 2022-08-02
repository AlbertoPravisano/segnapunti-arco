import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Table } from "semantic-ui-react";

import { addShotToPlayer } from "../../redux/reducer";
import { Configuration } from "../../tools/configuration";
import { getShotsByTrack, Player } from "../../tools/player";
import { Shot, getScoreFromShots } from "../../tools/shot";

interface Props {
  player: Player;
  track: string;
  configuration: Configuration;
}

const TablePlayerMatch: React.FC<Props> = ({
  player,
  track,
  configuration,
}) => {
  const shotsByTrack = getShotsByTrack(player, track);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const tentatives = configuration.tentatives;
  const shotsPerTentative = configuration.shots_per_tentative;
  const points = configuration.points;
  const shotsPerTrack = configuration.shots_per_track;

  return (
    <Table celled compact definition unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          {[...Array(tentatives).keys()].map((x, indexX) => {
            return [...Array(shotsPerTentative).keys()].map((y, indexY) => (
              <Table.HeaderCell key={`${track}${indexX}${indexY}`}>
                {indexX + 1}
              </Table.HeaderCell>
            ));
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {[...Array(shotsPerTrack).keys()].map((x, index) => (
          <Row
            key={index}
            idShot={index + 1}
            shots={shotsByTrack}
            points={points}
            tentatives={tentatives}
            shotsPerTentative={shotsPerTentative}
            onCellSelected={(id, tentative, score) =>
              dispatch(
                addShotToPlayer({
                  name: player.name,
                  shot: {
                    id,
                    track,
                    tentative,
                    score,
                  },
                })
              )
            }
          />
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="10" textAlign="right">
            {t("common.total")}: {getScoreFromShots(shotsByTrack)}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default TablePlayerMatch;

interface RowProps {
  idShot: number;
  shots: Shot[];
  points: number[];
  tentatives: number;
  shotsPerTentative: number;
  onCellSelected: (idShot: number, tentative: number, score: number) => void;
}

const Row: React.FC<RowProps> = ({
  shots,
  idShot,
  points,
  tentatives,
  shotsPerTentative,
  onCellSelected,
}) => {
  const indexShot = shots.findIndex((t) => t.id === idShot);
  const shotValue = indexShot > -1 ? shots[indexShot] : undefined;
  let p = [...points].reverse();

  return (
    <Table.Row>
      <Table.Cell>{idShot}</Table.Cell>
      {[...Array(tentatives).keys()].map((x, indexX) => {
        return [...Array(shotsPerTentative).keys()].map((y, indexY) => {
          return (
            <Cell
              key={`${indexX}${indexY}`}
              idShot={idShot}
              shotValue={shotValue}
              tentative={indexX + 1}
              cellScore={p.pop() || 0}
              onCellSelected={onCellSelected}
            />
          );
        });
      })}
    </Table.Row>
  );
};

interface CellProps {
  idShot: number;
  cellScore: number;
  tentative: number;
  shotValue?: Shot;
  onCellSelected: (
    idShot: number,
    tentative: number,
    punteggio: number
  ) => void;
}

const Cell: React.FC<CellProps> = ({
  idShot,
  shotValue,
  tentative,
  cellScore,
  onCellSelected,
}) => {
  return (
    <Table.Cell
      style={
        shotValue &&
        shotValue.score === cellScore &&
        shotValue.tentative === tentative
          ? { backgroundColor: "Cyan" }
          : undefined
      }
      onClick={() => onCellSelected(idShot, tentative, cellScore)}
    >
      {cellScore}
    </Table.Cell>
  );
};
