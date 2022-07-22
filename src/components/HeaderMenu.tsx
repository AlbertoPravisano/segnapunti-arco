import React from "react";
import { Menu } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import { StatoPartitaEnum } from "../tools/statoPartita";
import { cambiaView } from "../redux/reducer";
import logo from "../images/target-512.png";

interface Props {
  statoPartita: keyof typeof StatoPartitaEnum;
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
      <Menu.Item
        as="a"
        active={statoPartita === StatoPartitaEnum.PUNTEGGI_PARTITE_PRECEDENTI}
        onClick={() =>
          dispatch(cambiaView(StatoPartitaEnum.PUNTEGGI_PARTITE_PRECEDENTI))
        }
      >
        Punteggi precedenti
      </Menu.Item>
      <Menu.Item position="right">Sviluppato da Alberto!</Menu.Item>
    </Menu>
  );
};

export default HeaderMenu;
