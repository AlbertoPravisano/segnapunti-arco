import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { Init } from "../redux/reducer";
import { calcolaRisultatoFinaleGiocatore } from "../tools/interfaces";

const RisultatiPartita = () => {
  const giocatori = useSelector((state: Init) => state.giocatori);
  return (
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
  );
};

export default RisultatiPartita;
