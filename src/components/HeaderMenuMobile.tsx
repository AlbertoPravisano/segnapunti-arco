import React from "react";
import { useDispatch } from "react-redux";
import { Container, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import logo from "../images/target-512.png";
import { cambiaView } from "../redux/reducer";
import { StatoPartita } from "../tools/interfaces";
import { StatoPartitaEnum } from "../tools/statoPartita";

interface Props {
  statoPartita: StatoPartita;
  giocatoriInizializzati: boolean;
  children: any;
}

const HeaderMenuMobile: React.FC<Props> = ({
  statoPartita,
  giocatoriInizializzati,
  children,
}) => {
  const [sidebarOpened, setSidebarOpened] = React.useState(false);
  const dispatch = useDispatch();

  const handleMenuItemClicked = (nuovoStato: StatoPartita) => {
    setSidebarOpened(false);
    dispatch(cambiaView(nuovoStato));
  };

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        onHide={() => setSidebarOpened(false)}
        vertical
        visible={sidebarOpened}
      >
        <Menu.Item
          as="a"
          header
          active={statoPartita === StatoPartitaEnum.HOME}
          onClick={() => handleMenuItemClicked(StatoPartitaEnum.HOME)}
        >
          <img alt="logo" src={logo} />
          <br />
          <br />
          Home
        </Menu.Item>
        <Menu.Item
          as="a"
          active={
            statoPartita === StatoPartitaEnum.INIZIALIZZAZIONE_GIOCATORI ||
            statoPartita === StatoPartitaEnum.PARTITA_IN_CORSO
          }
          onClick={() => {
            handleMenuItemClicked(
              giocatoriInizializzati
                ? StatoPartitaEnum.PARTITA_IN_CORSO
                : StatoPartitaEnum.INIZIALIZZAZIONE_GIOCATORI
            );
          }}
        >
          Vai alla partita
        </Menu.Item>
        {giocatoriInizializzati && (
          <Menu.Item
            as="a"
            active={statoPartita === StatoPartitaEnum.PARTITA_CONCLUSA}
            onClick={() =>
              handleMenuItemClicked(StatoPartitaEnum.PARTITA_CONCLUSA)
            }
          >
            Risultati
          </Menu.Item>
        )}
        <Menu.Item
          as="a"
          active={statoPartita === StatoPartitaEnum.PUNTEGGI_PARTITE_PRECEDENTI}
          onClick={() =>
            handleMenuItemClicked(StatoPartitaEnum.PUNTEGGI_PARTITE_PRECEDENTI)
          }
        >
          Punteggi precedenti
        </Menu.Item>
        <div style={{ bottom: 0, position: "absolute", width: "100%" }}>
          <Menu.Item />
          <Menu.Item
            link
            href="https://www.t.me/PRAV01"
            target="_blank"
            position="right"
          >
            Sviluppato da Alberto!
          </Menu.Item>
        </div>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment
          basic
          textAlign="center"
          style={{ padding: "1em 0em" }}
          vertical
        >
          <Container>
            <Menu pointing secondary size="large">
              <Menu.Item onClick={() => setSidebarOpened(true)}>
                <Icon name="sidebar" />
              </Menu.Item>
            </Menu>
          </Container>
        </Segment>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default HeaderMenuMobile;
