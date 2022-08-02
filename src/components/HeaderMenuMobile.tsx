import React from "react";
import { useDispatch } from "react-redux";
import { Container, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import logo from "../images/target-512.png";
import { changeView } from "../redux/reducer";
import { View, ViewsEnum } from "../tools/match";

interface Props {
  view: View;
  playersInitialized: boolean;
  children: any;
}

const HeaderMenuMobile: React.FC<Props> = ({
  view,
  playersInitialized,
  children,
}) => {
  const [sidebarOpened, setSidebarOpened] = React.useState(false);
  const dispatch = useDispatch();

  const handleMenuItemClicked = (newView: View) => {
    setSidebarOpened(false);
    dispatch(changeView(newView));
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
          active={view === ViewsEnum.HOME}
          onClick={() => handleMenuItemClicked(ViewsEnum.HOME)}
        >
          <img alt="logo" src={logo} />
          <br />
          <br />
          Home
        </Menu.Item>
        <Menu.Item
          as="a"
          active={
            view === ViewsEnum.PLAYERS_INITIALIZATION ||
            view === ViewsEnum.MATCH_STARTED
          }
          onClick={() => {
            handleMenuItemClicked(
              playersInitialized
                ? ViewsEnum.MATCH_STARTED
                : ViewsEnum.PLAYERS_INITIALIZATION
            );
          }}
        >
          Vai alla partita
        </Menu.Item>
        {playersInitialized && (
          <Menu.Item
            as="a"
            active={view === ViewsEnum.RESULTS_MATCH}
            onClick={() => handleMenuItemClicked(ViewsEnum.RESULTS_MATCH)}
          >
            Risultati
          </Menu.Item>
        )}
        <Menu.Item
          as="a"
          active={view === ViewsEnum.LEADERBOARD}
          onClick={() => handleMenuItemClicked(ViewsEnum.LEADERBOARD)}
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
