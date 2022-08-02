import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Flag, Menu } from "semantic-ui-react";

import logo from "../../images/target-512.png";
import { changeView } from "../../redux/reducer";
import { View, ViewsEnum } from "../../tools/match";

interface Props {
  view: View;
  playersInitialized: boolean;
}

const HeaderMenu: React.FC<Props> = ({ view, playersInitialized }) => {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("common");

  return (
    <Menu size="large">
      <Menu.Item
        as="a"
        active={view === ViewsEnum.HOME}
        onClick={() => dispatch(changeView(ViewsEnum.HOME))}
      >
        <img alt="logo" src={logo} />
        &ensp;{t("header.home")}
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
        {t("header.go_to_match")}
      </Menu.Item>
      {playersInitialized && (
        <Menu.Item
          as="a"
          active={view === ViewsEnum.RESULTS_MATCH}
          onClick={() => dispatch(changeView(ViewsEnum.RESULTS_MATCH))}
        >
          {t("header.results")}
        </Menu.Item>
      )}
      <Menu.Item
        as="a"
        active={view === ViewsEnum.LEADERBOARD}
        onClick={() => dispatch(changeView(ViewsEnum.LEADERBOARD))}
      >
        {t("header.leaderboard")}
      </Menu.Item>
      <Menu.Item position="right">
        <Flag
          name="italy"
          style={{ cursor: "pointer" }}
          onClick={() => i18n.changeLanguage("it")}
        />
        <Flag
          name="gb"
          style={{ cursor: "pointer" }}
          onClick={() => i18n.changeLanguage("en")}
        />
      </Menu.Item>
      <Menu.Item
        as="a"
        position="right"
        active={view === ViewsEnum.CONFIGURATIONS}
        onClick={() => dispatch(changeView(ViewsEnum.CONFIGURATIONS))}
      >
        {t("common.configuration")}
      </Menu.Item>
      <Menu.Item
        link
        href="https://www.t.me/PRAV01"
        target="_blank"
        position="right"
      >
        {t("header.mark")}
      </Menu.Item>
    </Menu>
  );
};

export default HeaderMenu;
