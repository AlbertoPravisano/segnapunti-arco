import React from "react";
import { Container } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { StatoPartitaEnum } from "./tools/statoPartita";
import { Init } from "./redux/reducer";

import Home from "./views/Home";
import HeaderMenu from "./components/HeaderMenu";
import Partita from "./views/Partita";
import RisultatiPartita from "./views/RisultatiPartita";
import InputGiocatori from "./views/InputGiocatori";
import LeaderBoard from "./views/LeaderBoard";

const App = () => {
  const { statoPartita, giocatori } = useSelector((state: Init) => state);

  return (
    <React.Fragment>
      <HeaderMenu
        statoPartita={statoPartita}
        giocatoriInizializzati={giocatori.length > 0}
      />
      <Container>
        {
          {
            [StatoPartitaEnum.HOME]: <Home />,
            [StatoPartitaEnum.INIZIALIZZAZIONE_GIOCATORI]: <InputGiocatori />,
            [StatoPartitaEnum.PARTITA_IN_CORSO]: <Partita />,
            [StatoPartitaEnum.PARTITA_CONCLUSA]: <RisultatiPartita />,
            [StatoPartitaEnum.PUNTEGGI_PARTITE_PRECEDENTI]: <LeaderBoard />,
          }[statoPartita]
        }
      </Container>
      <br />
      <br />
    </React.Fragment>
  );
};

export default App;
