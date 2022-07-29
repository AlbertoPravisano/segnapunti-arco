import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "semantic-ui-react";
import { Init, resettaStatoPartita } from "../redux/reducer";
import { calcolaRisultatoFinaleGiocatore } from "../tools/interfaces";

const RisultatiPartita = () => {
  const giocatori = useSelector((state: Init) => state.giocatori);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Grid>
        {giocatori.map((giocatore) => {
          return (
            <Grid.Row>
              <Grid.Column>{giocatore.nome}</Grid.Column>
              <Grid.Column>
                {calcolaRisultatoFinaleGiocatore(giocatore)}
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
      <br />
      <Button.Group>
        <Button
          negative
          floated="right"
          onClick={() => dispatch(resettaStatoPartita())}
        >
          Inizia una nuova partita
        </Button>
        <Button.Or text="o" />
        <Button primary floated="right">
          Salva i risultati
        </Button>
      </Button.Group>
    </React.Fragment>
  );
};

export default RisultatiPartita;
