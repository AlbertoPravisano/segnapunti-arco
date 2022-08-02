import React from "react";
import { Container } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { ViewsEnum } from "./tools/match";
import { Init } from "./redux/reducer";

import Home from "./views/Home";
// import HeaderMenu from "./components/HeaderMenu";
import Match from "./views/Match";
import MatchResults from "./views/MatchResults";
import InsertPlayers from "./views/InsertPlayers";
import LeaderBoard from "./views/LeaderBoard";
import HeaderMenuMobile from "./components/HeaderMenuMobile";

const App = () => {
  const { view, players } = useSelector((state: Init) => state);

  return (
    <HeaderMenuMobile view={view} playersInitialized={players.length > 0}>
      <Container>
        {
          {
            [ViewsEnum.HOME]: <Home />,
            [ViewsEnum.PLAYERS_INITIALIZATION]: <InsertPlayers />,
            [ViewsEnum.MATCH_STARTED]: <Match />,
            [ViewsEnum.RESULTS_MATCH]: <MatchResults />,
            [ViewsEnum.LEADERBOARD]: <LeaderBoard />,
          }[view]
        }
      </Container>
      <br />
      <br />
    </HeaderMenuMobile>
  );
};

export default App;
