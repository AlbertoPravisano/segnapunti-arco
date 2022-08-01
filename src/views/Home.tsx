import React from "react";
import { useDispatch } from "react-redux";
import { Header, Image } from "semantic-ui-react";
import image from "../images/target-512.png";
import { cambiaView } from "../redux/reducer";

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
        onClick={() => dispatch(cambiaView("INIZIALIZZAZIONE_GIOCATORI"))}
      />
    </React.Fragment>
  );
};

export default Home;
