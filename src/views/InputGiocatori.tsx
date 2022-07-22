import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Form } from "semantic-ui-react";
import {
  aggiungiGiocatore,
  cambiaView,
  Init,
  rimuoviUltimoGiocatore,
} from "../redux/reducer";
import { StatoPartitaEnum } from "../tools/statoPartita";

const InputGiocatori = () => {
  const giocatori = useSelector((state: Init) => state.giocatori);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {giocatori.map((giocatore, index) => {
        return (
          <div key={index}>
            Giocatore {index + 1}:{" "}
            <Input transparent readOnly value={giocatore.nome} />
          </div>
        );
      })}
      <AggiungiNuovoGiocatore />
      <Button.Group>
        <Button onClick={() => dispatch(rimuoviUltimoGiocatore())}>
          Hai commesso un errore? Rimuovi l'ultimo giocatore
        </Button>
        <Button.Or />
        <Button
          onClick={() =>
            dispatch(cambiaView(StatoPartitaEnum.PARTITA_IN_CORSO))
          }
        >
          Inizia partita
        </Button>
      </Button.Group>
    </React.Fragment>
  );
};

export default InputGiocatori;

const AggiungiNuovoGiocatore = () => {
  const [nome, setNome] = React.useState("");
  const dispatch = useDispatch();

  return (
    <Form
      onSubmit={() => {
        dispatch(aggiungiGiocatore(nome));
        setNome("");
      }}
    >
      <Form.Field inline>
        <Input
          value={nome}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNome(e.target.value)
          }
        />
        <Button type="submit">Aggiungi</Button>
      </Form.Field>
    </Form>
  );
};
