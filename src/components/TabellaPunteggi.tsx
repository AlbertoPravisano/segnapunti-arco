import React from "react";
import { Table } from "semantic-ui-react";
import { calcolaPunteggioTotale, RisultatiGiocatore } from "../tools/partita";

interface Props {
  risultatiGiocatore: RisultatiGiocatore;
}

const TabellaPunteggi: React.FC<Props> = ({ risultatiGiocatore }) => {
  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="3" textAlign="right">
            {risultatiGiocatore.giocatore}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {risultatiGiocatore.partite.map((partita, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{partita.data}</Table.Cell>
              <Table.Cell>{partita.punteggio}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="3" textAlign="right">
            Punteggio totale:{" "}
            {calcolaPunteggioTotale(risultatiGiocatore.partite)}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default TabellaPunteggi;
