import React from "react";
import { useDispatch } from "react-redux";
import { Menu } from "semantic-ui-react";

import logo from "../images/target-512.png";
import { cambiaView } from "../redux/reducer";
import { StatoPartita, StatoPartitaEnum } from "../tools/partita";

interface Props {
  statoPartita: StatoPartita;
  giocatoriInizializzati: boolean;
}

const HeaderMenu: React.FC<Props> = ({
  statoPartita,
  giocatoriInizializzati,
}) => {
  const dispatch = useDispatch();
  return (
    <Menu size="large">
      <Menu.Item
        as="a"
        active={statoPartita === StatoPartitaEnum.HOME}
        onClick={() => dispatch(cambiaView(StatoPartitaEnum.HOME))}
      >
        <img alt="logo" src={logo} />
        &ensp;Home
      </Menu.Item>
      <Menu.Item
        as="a"
        active={
          statoPartita === StatoPartitaEnum.INIZIALIZZAZIONE_GIOCATORI ||
          statoPartita === StatoPartitaEnum.PARTITA_IN_CORSO
        }
        onClick={() =>
          dispatch(
            cambiaView(
              giocatoriInizializzati
                ? StatoPartitaEnum.PARTITA_IN_CORSO
                : StatoPartitaEnum.INIZIALIZZAZIONE_GIOCATORI
            )
          )
        }
      >
        Vai alla partita
      </Menu.Item>
      {giocatoriInizializzati && (
        <Menu.Item
          as="a"
          active={statoPartita === StatoPartitaEnum.PARTITA_CONCLUSA}
          onClick={() =>
            dispatch(cambiaView(StatoPartitaEnum.PARTITA_CONCLUSA))
          }
        >
          Risultati
        </Menu.Item>
      )}
      <Menu.Item
        as="a"
        active={statoPartita === StatoPartitaEnum.PUNTEGGI_PARTITE_PRECEDENTI}
        onClick={() =>
          dispatch(cambiaView(StatoPartitaEnum.PUNTEGGI_PARTITE_PRECEDENTI))
        }
      >
        Punteggi precedenti
      </Menu.Item>
      <Menu.Item
        link
        href="https://www.t.me/PRAV01"
        target="_blank"
        position="right"
      >
        Sviluppato da Alberto!
      </Menu.Item>
    </Menu>
  );
};

export default HeaderMenu;
