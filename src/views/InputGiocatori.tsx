import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Form, Message } from "semantic-ui-react";
import {
  aggiungiGiocatore,
  cambiaView,
  Init,
  rimuoviUltimoGiocatore,
} from "../redux/reducer";
import { StatoPartitaEnum } from "../tools/statoPartita";

const InputGiocatori = () => {
  const giocatori = useSelector((state: Init) => state.giocatori);
  const [inErrore, setInErrore] = React.useState(false);
  const dispatch = useDispatch();

  const onIniziaPartita = () => {
    if (giocatori.length > 0) {
      dispatch(cambiaView(StatoPartitaEnum.PARTITA_IN_CORSO));
    } else {
      setInErrore(true);
    }
  };

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
      <Button.Group floated="right">
        <Button onClick={() => dispatch(rimuoviUltimoGiocatore())}>
          Hai commesso un errore? Rimuovi l'ultimo giocatore
        </Button>
        <Button.Or text="o" />
        <Button primary onClick={onIniziaPartita}>
          Inizia partita
        </Button>
      </Button.Group>
      <br />
      <br />
      {inErrore && (
        <Message
          negative
          icon="ban"
          content="Non puoi iniziare la partita senza aver inserito almeno un giocatore!"
          onDismiss={() => setInErrore(false)}
        />
      )}
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
