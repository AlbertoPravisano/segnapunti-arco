import React from "react";
import { Header, Image } from "semantic-ui-react";
import image from "../images/target-512.png";

const Home = () => {
  return (
    <React.Fragment>
      <Header>Segnapunti per tiro con l'arco!</Header>
      <Image alt="logo" src={image} centered />
    </React.Fragment>
  );
};

export default Home;
