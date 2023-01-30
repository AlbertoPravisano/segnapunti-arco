import React from "react";
import { useTranslation } from "react-i18next";
import { Table } from "semantic-ui-react";
import { getMediumScore, PlayerHistory } from "../../tools/match";

interface Props {
  playerHistory: PlayerHistory;
}

const TablePlayerHistory: React.FC<Props> = ({ playerHistory }) => {
  const { t } = useTranslation("common");
  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="3" textAlign="right">
            {playerHistory.playerName}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {playerHistory.matches.map((match, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{match.date}</Table.Cell>
              <Table.Cell>{match.points}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="3" textAlign="right">
            {t("common.medium_score")} {getMediumScore(playerHistory.matches)}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default TablePlayerHistory;
