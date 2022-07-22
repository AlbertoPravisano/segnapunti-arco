import React from "react";
import { useSelector } from "react-redux";
import { Tab } from "semantic-ui-react";

import TabellaTiriGiocatore from "../components/TabellaTiriGiocatore";
import { Init } from "../redux/reducer";

const Partita = () => {
  const giocatori = useSelector((state: Init) => state.giocatori);

  return (
    <Tab
      panes={giocatori.map((giocatore) => ({
        menuItem: giocatore.nome,
        render: () => (
          <React.Fragment>
            <br />
            TRACCIATO A
            <TabellaTiriGiocatore giocatore={giocatore} />
            TRACCIATO B
            <TabellaTiriGiocatore giocatore={giocatore} />
          </React.Fragment>
        ),
      }))}
    />
  );
};

export default Partita;
