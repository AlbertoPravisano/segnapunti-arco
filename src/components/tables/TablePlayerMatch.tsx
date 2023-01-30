import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "semantic-ui-react";

import { addShotToPlayer, Init } from "../../redux/reducer";
import { Configuration } from "../../tools/configuration";
import { getShotsByTrack, Player } from "../../tools/player";
import { Shot } from "../../tools/shot";

interface Props {
  player: Player;
  track: string;
  configuration: Configuration;
  readOnly?: boolean;
}

const TablePlayerMatch: React.FC<Props> = ({
  player,
  track,
  configuration,
  readOnly,
}) => {
  const dispatch = useDispatch();

  const tentatives = configuration.tentatives;
  const shotsPerTentative = configuration.shots_per_tentative;
  const points = configuration.points;
  const shotsPerTrack = configuration.shots_per_track;

  return (
    <Table celled compact definition unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          {[...Array(tentatives).keys()].map((_, indexX) => {
            return [...Array(shotsPerTentative).keys()].map((_, indexY) => (
              <Table.HeaderCell key={`${track}${indexX}${indexY}`}>
                {indexX + 1}
              </Table.HeaderCell>
            ));
          })}
          <Table.HeaderCell>MISS</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {[...Array(shotsPerTrack).keys()].map((_, index) => (
          <Row
            key={index}
            idShot={index}
            shots={getShotsByTrack(player, track)}
            points={points}
            tentatives={tentatives}
            shotsPerTentative={shotsPerTentative}
            readOnly={readOnly}
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
    </Table>
  );
};

export default TablePlayerMatch;

interface RowProps {
  idShot: number;
  shots: Shot[];
  points: number[];
  tentatives: number;
  readOnly?: boolean;
  shotsPerTentative: number;
  onCellSelected: (idShot: number, tentative: number, score: number) => void;
}

const Row: React.FC<RowProps> = ({
  shots,
  idShot,
  points,
  tentatives,
  readOnly,
  shotsPerTentative,
  onCellSelected,
}) => {
  const indexShot = shots.findIndex((t) => t.id === idShot);
  const shotValue = indexShot > -1 ? shots[indexShot] : undefined;
  let p = [...points].reverse();

  return (
    <Table.Row>
      <Table.Cell>{idShot + 1}</Table.Cell>
      {[...Array(tentatives).keys()].map((_, indexX) => {
        return [...Array(shotsPerTentative).keys()].map((_, indexY) => {
          return (
            <Cell
              key={`${indexX}${indexY}`}
              idShot={idShot}
              shotValue={shotValue}
              tentative={indexX + 1}
              cellScore={p.pop() || 0}
              onCellSelected={readOnly ? undefined : onCellSelected}
            />
          );
        });
      })}
      <Cell
        idShot={idShot}
        shotValue={shotValue}
        tentative={0}
        cellScore={0}
        onCellSelected={readOnly ? undefined : onCellSelected}
      />
    </Table.Row>
  );
};

interface CellProps {
  idShot: number;
  cellScore: number;
  tentative: number;
  shotValue?: Shot;
  onCellSelected?: (
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
  const configuration = useSelector((state: Init) => state.configuration);
  return (
    <Table.Cell
      style={
        shotValue &&
        shotValue.score === cellScore &&
        shotValue.tentative === tentative
          ? { backgroundColor: configuration.color_selected_cell }
          : undefined
      }
      onClick={() =>
        onCellSelected && onCellSelected(idShot, tentative, cellScore)
      }
    >
      {cellScore}
    </Table.Cell>
  );
};
