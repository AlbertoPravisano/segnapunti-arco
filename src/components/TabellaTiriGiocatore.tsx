import React from "react";
import { Table } from "semantic-ui-react";
import { Giocatore } from "../tools/interfaces";

interface Props {
  giocatore: Giocatore;
}

const TabellaTiriGiocatore: React.FC<Props> = ({ giocatore }) => {
  return (
    <Table celled compact definition>
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
        {[...Array(11).keys()].map((x, index) => {
          return <RigaTabella tiro={index + 1} />;
        })}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="10" textAlign="right">
            Totale : 300
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default TabellaTiriGiocatore;

const RigaTabella: React.FC<{ tiro: number }> = ({ tiro }) => {
  return (
    <Table.Row>
      <Table.Cell>{tiro}</Table.Cell>
      <Table.Cell>22</Table.Cell>
      <Table.Cell>20</Table.Cell>
      <Table.Cell>16</Table.Cell>
      <Table.Cell>16</Table.Cell>
      <Table.Cell>14</Table.Cell>
      <Table.Cell>10</Table.Cell>
      <Table.Cell>10</Table.Cell>
      <Table.Cell>8</Table.Cell>
      <Table.Cell>4</Table.Cell>
    </Table.Row>
  );
};
