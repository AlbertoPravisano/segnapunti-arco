import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "semantic-ui-react";

import TabellaTiriGiocatore from "../components/TabellaTiriGiocatore";
import { cambiaView, Init } from "../redux/reducer";
import { NUMERO_TIRI } from "../tools/interfaces";
import { StatoPartitaEnum } from "../tools/statoPartita";

const Partita = () => {
  const giocatori = useSelector((state: Init) => state.giocatori);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let totaleTiri = 0;
    const N_TRACCIATI = 2;
    giocatori.forEach((giocatore) => (totaleTiri += giocatore.tiri.length));
    if (totaleTiri === NUMERO_TIRI * giocatori.length * N_TRACCIATI) {
      dispatch(cambiaView(StatoPartitaEnum.PARTITA_CONCLUSA));
    }
  }, [dispatch, giocatori]);

  return (
    <Tab
      panes={giocatori.map((giocatore) => ({
        menuItem: giocatore.nome,
        render: () => (
          <React.Fragment>
            <br />
            TRACCIATO A
            <TabellaTiriGiocatore giocatore={giocatore} tracciato="A" />
            TRACCIATO B
            <TabellaTiriGiocatore giocatore={giocatore} tracciato="B" />
          </React.Fragment>
        ),
      }))}
    />
  );
};

export default Partita;
