import React from "react";
import { useDispatch } from "react-redux";
import { Menu } from "semantic-ui-react";

import logo from "../images/target-512.png";
import { changeView } from "../redux/reducer";
import { View, ViewsEnum } from "../tools/match";

interface Props {
  view: View;
  playersInitialized: boolean;
}

const HeaderMenu: React.FC<Props> = ({ view, playersInitialized }) => {
  const dispatch = useDispatch();

  return (
    <Menu size="large">
      <Menu.Item
        as="a"
        active={view === ViewsEnum.HOME}
        onClick={() => dispatch(changeView(ViewsEnum.HOME))}
      >
        <img alt="logo" src={logo} />
        &ensp;Home
      </Menu.Item>
      <Menu.Item
        as="a"
        active={
          view === ViewsEnum.PLAYERS_INITIALIZATION ||
          view === ViewsEnum.MATCH_STARTED
        }
        onClick={() =>
          dispatch(
            changeView(
              playersInitialized
                ? ViewsEnum.MATCH_STARTED
                : ViewsEnum.PLAYERS_INITIALIZATION
            )
          )
        }
      >
        Vai alla partita
      </Menu.Item>
      {playersInitialized && (
        <Menu.Item
          as="a"
          active={view === ViewsEnum.RESULTS_MATCH}
          onClick={() => dispatch(changeView(ViewsEnum.RESULTS_MATCH))}
        >
          Risultati
        </Menu.Item>
      )}
      <Menu.Item
        as="a"
        active={view === ViewsEnum.LEADERBOARD}
        onClick={() => dispatch(changeView(ViewsEnum.LEADERBOARD))}
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
