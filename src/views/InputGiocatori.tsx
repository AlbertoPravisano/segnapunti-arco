import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Form, Grid } from "semantic-ui-react";
import {
  aggiungiGiocatore,
  cambiaView,
  Init,
  rimuoviUltimoGiocatore,
} from "../redux/reducer";
import { Giocatore } from "../tools/giocatore";
import {
  calcolaPunteggioTotale,
  CronologiaGiocatori,
  getCronologiaGiocatori,
  StatoPartitaEnum,
} from "../tools/partita";

const InputGiocatori = () => {
  const giocatori = useSelector((state: Init) => state.giocatori);
  const dispatch = useDispatch();

  const onIniziaPartita = () => {
    if (giocatori.length > 0) {
      dispatch(cambiaView(StatoPartitaEnum.PARTITA_IN_CORSO));
    }
  };
  const nessunGiocatoreInserito = giocatori.length === 0;

  return (
    <React.Fragment>
      <GiocatoriPartitaInCorso
        giocatori={giocatori}
        cronologiaGiocatori={getCronologiaGiocatori()}
      />
      <AggiungiNuovoGiocatore />
      <Button.Group
        title={
          nessunGiocatoreInserito
            ? "Inserisci almeno un giocatore per iniziare la partita"
            : undefined
        }
        floated="right"
      >
        <Button
          negative
          disabled={nessunGiocatoreInserito}
          onClick={() => dispatch(rimuoviUltimoGiocatore())}
        >
          Annulla l'ultimo inserimento
        </Button>
        <Button.Or text="o" />
        <Button
          primary
          disabled={nessunGiocatoreInserito}
          onClick={onIniziaPartita}
        >
          Inizia partita
        </Button>
      </Button.Group>
    </React.Fragment>
  );
};

export default InputGiocatori;

interface Props {
  giocatori: Giocatore[];
  cronologiaGiocatori: CronologiaGiocatori;
}

const GiocatoriPartitaInCorso: React.FC<Props> = ({
  giocatori,
  cronologiaGiocatori,
}) => {
  return (
    <Grid>
      {giocatori.length > 0 ? (
        <Grid.Row>
          <Grid.Column width="6">Nome giocatore</Grid.Column>
          <Grid.Column width="4">
            Punteggio totale partite precedenti
          </Grid.Column>
        </Grid.Row>
      ) : (
        <Grid.Row />
      )}
      {giocatori.map((giocatore, index) => {
        const indiceGiocatore = cronologiaGiocatori.findIndex(
          (cronologiaGiocatore) =>
            cronologiaGiocatore.giocatore === giocatore.nome
        );
        const punteggioStorico =
          indiceGiocatore > -1
            ? calcolaPunteggioTotale(
                cronologiaGiocatori[indiceGiocatore].partite
              )
            : 0;
        return (
          <Grid.Row key={index}>
            <Grid.Column width="6">
              Giocatore {index + 1}:{" "}
              <Input transparent readOnly value={giocatore.nome} />
            </Grid.Column>

            <Grid.Column width="4">{punteggioStorico}</Grid.Column>
          </Grid.Row>
        );
      })}
    </Grid>
  );
};

const AggiungiNuovoGiocatore = () => {
  const [nome, setNome] = React.useState("");
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Form
        onSubmit={() => {
          if (nome.length > 0) {
            dispatch(aggiungiGiocatore(nome));
            setNome("");
          }
        }}
      >
        <Form.Field inline>
          <Input
            value={nome}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNome(e.target.value)
            }
          />
          <Button disabled={nome.length === 0} type="submit">
            Aggiungi
          </Button>
        </Form.Field>
      </Form>
    </React.Fragment>
  );
};
