import React from "react";
import { useDispatch } from "react-redux";
import { Table } from "semantic-ui-react";
import { aggiungiTiroGiocatore } from "../redux/reducer";
import {
  getTiriTracciato,
  Giocatore,
  NUMERO_TIRI,
  Tiro,
} from "../tools/interfaces";

interface Props {
  giocatore: Giocatore;
  tracciato: string;
}

const getPunteggioTracciato = (tiri: Tiro[]) => {
  let punteggio = 0;
  tiri.forEach((tiro) => (punteggio += tiro.punteggio));
  return punteggio;
};

const TabellaTiriGiocatore: React.FC<Props> = ({ giocatore, tracciato }) => {
  const tiriTracciato = getTiriTracciato(giocatore, tracciato);
  const dispatch = useDispatch();
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
        {[...Array(NUMERO_TIRI).keys()].map((x, index) => {
          return (
            <RigaTabella
              key={index}
              idTiro={index + 1}
              tiri={tiriTracciato}
              onClickCella={(id, tentativo, punteggio) =>
                dispatch(
                  aggiungiTiroGiocatore({
                    nome: giocatore.nome,
                    tiro: {
                      id,
                      tracciato,
                      tentativo,
                      punteggio,
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
            Totale: {getPunteggioTracciato(tiriTracciato)}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default TabellaTiriGiocatore;

interface RigaTabellaProps {
  idTiro: number;
  tiri: Tiro[];
  onClickCella: (idTiro: number, tentativo: number, punteggio: number) => void;
}

const RigaTabella: React.FC<RigaTabellaProps> = ({
  tiri,
  idTiro,
  onClickCella,
}) => {
  const indexTiro = tiri.findIndex((t) => t.id === idTiro);
  const tiroValorizzato = indexTiro > -1 ? tiri[indexTiro] : undefined;
  return (
    <Table.Row>
      <Table.Cell>{idTiro}</Table.Cell>
      <CellaTiro
        idTiro={idTiro}
        tiroValorizzato={tiroValorizzato}
        tentativo={1}
        punteggioCella={22}
        onClickCella={onClickCella}
      />
      <CellaTiro
        idTiro={idTiro}
        tiroValorizzato={tiroValorizzato}
        tentativo={1}
        onClickCella={onClickCella}
        punteggioCella={20}
      />
      <CellaTiro
        idTiro={idTiro}
        tiroValorizzato={tiroValorizzato}
        tentativo={1}
        onClickCella={onClickCella}
        punteggioCella={16}
      />
      <CellaTiro
        idTiro={idTiro}
        tiroValorizzato={tiroValorizzato}
        tentativo={2}
        onClickCella={onClickCella}
        punteggioCella={16}
      />
      <CellaTiro
        idTiro={idTiro}
        tiroValorizzato={tiroValorizzato}
        tentativo={2}
        onClickCella={onClickCella}
        punteggioCella={14}
      />
      <CellaTiro
        idTiro={idTiro}
        tiroValorizzato={tiroValorizzato}
        tentativo={2}
        onClickCella={onClickCella}
        punteggioCella={10}
      />
      <CellaTiro
        idTiro={idTiro}
        tiroValorizzato={tiroValorizzato}
        tentativo={3}
        onClickCella={onClickCella}
        punteggioCella={10}
      />
      <CellaTiro
        idTiro={idTiro}
        tiroValorizzato={tiroValorizzato}
        tentativo={3}
        onClickCella={onClickCella}
        punteggioCella={8}
      />
      <CellaTiro
        idTiro={idTiro}
        tiroValorizzato={tiroValorizzato}
        tentativo={3}
        onClickCella={onClickCella}
        punteggioCella={4}
      />
    </Table.Row>
  );
};

interface CellaTabellaProps {
  idTiro: number;
  punteggioCella: number;
  tentativo: number;
  tiroValorizzato?: Tiro;
  onClickCella: (idTiro: number, tentativo: number, punteggio: number) => void;
}

const CellaTiro: React.FC<CellaTabellaProps> = ({
  idTiro,
  tiroValorizzato,
  tentativo,
  punteggioCella,
  onClickCella,
}) => {
  return (
    <Table.Cell
      style={
        tiroValorizzato &&
        tiroValorizzato.punteggio === punteggioCella &&
        tiroValorizzato.tentativo === tentativo
          ? { backgroundColor: "Cyan" }
          : undefined
      }
      onClick={() => onClickCella(idTiro, tentativo, punteggioCella)}
    >
      {punteggioCella}
    </Table.Cell>
  );
};
