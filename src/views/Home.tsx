import React from "react";
import { useDispatch } from "react-redux";
import { Header, Image } from "semantic-ui-react";

import image from "../images/target-512.png";
import { changeView } from "../redux/reducer";
import { ViewsEnum } from "../tools/match";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Header>Segnapunti per tiro con l'arco!</Header>
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
