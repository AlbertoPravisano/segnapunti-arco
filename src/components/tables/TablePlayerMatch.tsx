import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Table } from "semantic-ui-react";

import { addShotToPlayer } from "../../redux/reducer";
import { getShotsByTrack, Player } from "../../tools/player";
import {
  NUMBER_OF_TARGETS_PER_TRACK,
  Shot,
  getScoreFromShots,
} from "../../tools/shot";

interface Props {
  player: Player;
  track: string;
}

const TablePlayerMatch: React.FC<Props> = ({ player, track }) => {
  const shotsByTrack = getShotsByTrack(player, track);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  return (
    <Table celled compact definition unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>1</Table.HeaderCell>
          <Table.HeaderCell>1</Table.HeaderCell>
          <Table.HeaderCell>1</Table.HeaderCell>
          <Table.HeaderCell>2</Table.HeaderCell>
          <Table.HeaderCell>2</Table.HeaderCell>
          <Table.HeaderCell>2</Table.HeaderCell>
          <Table.HeaderCell>3</Table.HeaderCell>
          <Table.HeaderCell>3</Table.HeaderCell>
          <Table.HeaderCell>3</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {[...Array(NUMBER_OF_TARGETS_PER_TRACK).keys()].map((x, index) => {
          return (
            <Row
              key={index}
              idShot={index + 1}
              shots={shotsByTrack}
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
          );
        })}
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
  onCellSelected: (idShot: number, tentative: number, score: number) => void;
}

const Row: React.FC<RowProps> = ({ shots, idShot, onCellSelected }) => {
  const indexShot = shots.findIndex((t) => t.id === idShot);
  const shotValue = indexShot > -1 ? shots[indexShot] : undefined;

  return (
    <Table.Row>
      <Table.Cell>{idShot}</Table.Cell>
      <Cell
        idShot={idShot}
        shotValue={shotValue}
        tentative={1}
        cellScore={22}
        onCellSelected={onCellSelected}
      />
      <Cell
        idShot={idShot}
        shotValue={shotValue}
        tentative={1}
        onCellSelected={onCellSelected}
        cellScore={20}
      />
      <Cell
        idShot={idShot}
        shotValue={shotValue}
        tentative={1}
        onCellSelected={onCellSelected}
        cellScore={16}
      />
      <Cell
        idShot={idShot}
        shotValue={shotValue}
        tentative={2}
        onCellSelected={onCellSelected}
        cellScore={16}
      />
      <Cell
        idShot={idShot}
        shotValue={shotValue}
        tentative={2}
        onCellSelected={onCellSelected}
        cellScore={14}
      />
      <Cell
        idShot={idShot}
        shotValue={shotValue}
        tentative={2}
        onCellSelected={onCellSelected}
        cellScore={10}
      />
      <Cell
        idShot={idShot}
        shotValue={shotValue}
        tentative={3}
        onCellSelected={onCellSelected}
        cellScore={10}
      />
      <Cell
        idShot={idShot}
        shotValue={shotValue}
        tentative={3}
        onCellSelected={onCellSelected}
        cellScore={8}
      />
      <Cell
        idShot={idShot}
        shotValue={shotValue}
        tentative={3}
        onCellSelected={onCellSelected}
        cellScore={4}
      />
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
