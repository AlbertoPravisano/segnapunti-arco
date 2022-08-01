import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Icon, Message } from "semantic-ui-react";

import NavButton from "../components/NavButton";
import { Init, resettaStatoPartita } from "../redux/reducer";
import { formatDateDDMMYYYY } from "../tools/dateUtils";
import { calcolaRisultatoFinaleGiocatore } from "../tools/giocatore";
import { getCronologiaGiocatori } from "../tools/partita";

const RisultatiPartita = () => {
  const date = new Date();
  const giocatori = useSelector((state: Init) => state.giocatori);
  const dispatch = useDispatch();
  const [isRisultatiSalvati, setIsRisultatiSalvati] = React.useState<
    boolean | undefined
  >(undefined);

  const onHandleSaveResults = () => {
    const cronologiePartitePrecedenti = getCronologiaGiocatori();
    let cronologiaAggiornata = cronologiePartitePrecedenti;

    if (cronologiePartitePrecedenti.length === 0) {
      cronologiaAggiornata = giocatori.map((giocatore) => ({
        giocatore: giocatore.nome,
        partite: [
          {
            punteggio: calcolaRisultatoFinaleGiocatore(giocatore),
            data: formatDateDDMMYYYY(date),
          },
        ],
      }));
    } else {
      giocatori.forEach((giocatorePartitaAttuale) => {
        const partitaGiocatore = {
          punteggio: calcolaRisultatoFinaleGiocatore(giocatorePartitaAttuale),
          data: formatDateDDMMYYYY(date),
        };
        const indiceGiocatoreInCronologia = cronologiaAggiornata.findIndex(
          (giocatore) => giocatore.giocatore === giocatorePartitaAttuale.nome
        );
        if (indiceGiocatoreInCronologia > -1) {
          cronologiaAggiornata[indiceGiocatoreInCronologia].partite.push(
            partitaGiocatore
          );
        } else {
          cronologiaAggiornata.push({
            giocatore: giocatorePartitaAttuale.nome,
            partite: [partitaGiocatore],
          });
        }
      });
    }

    localStorage.setItem("cronologia", JSON.stringify(cronologiaAggiornata));
    setIsRisultatiSalvati(true);
  };

  return (
    <React.Fragment>
      <Grid>
        {giocatori.map((giocatore, index) => {
          return (
            <Grid.Row key={index}>
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
        <NavButton icon labelPosition="left" view="PARTITA_IN_CORSO">
          Torna alla partita in corso <Icon name="reply" />
        </NavButton>{" "}
        <Button.Or text="o" />
        <Button
          negative
          floated="right"
          onClick={() => dispatch(resettaStatoPartita())}
        >
          Inizia una nuova partita
        </Button>
        <Button.Or text="o" />
        <Button primary floated="right" onClick={onHandleSaveResults}>
          Salva i risultati
        </Button>
      </Button.Group>
      {isRisultatiSalvati && (
        <Message info>
          <Grid>
            <Grid.Column width="8">
              <Message.Header>
                Hai salvato i risultati della partita!
              </Message.Header>
            </Grid.Column>
            <Grid.Column width="8">
              <NavButton floated="right" view="PUNTEGGI_PARTITE_PRECEDENTI">
                Vai alla leaderboard
              </NavButton>
            </Grid.Column>
          </Grid>
        </Message>
      )}
    </React.Fragment>
  );
};

export default RisultatiPartita;
