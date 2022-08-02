import React from "react";
import { useDispatch } from "react-redux";
import { Header, Image } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import image from "../images/target-512.png";
import { changeView } from "../redux/reducer";
import { ViewsEnum } from "../tools/match";

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  return (
    <React.Fragment>
      <Header>{t("home.header")}</Header>
      <Image
        alt="logo"
        src={image}
        centered
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(changeView(ViewsEnum.PLAYERS_INITIALIZATION))}
      />
    </React.Fragment>
  );
};

export default Home;
