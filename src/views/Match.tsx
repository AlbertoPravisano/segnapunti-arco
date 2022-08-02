import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Tab } from "semantic-ui-react";

import TablePlayerMatch from "../components/tables/TablePlayerMatch";
import { changeView, Init } from "../redux/reducer";
import { NUMBER_OF_TARGETS_PER_TRACK } from "../tools/shot";
import { ViewsEnum } from "../tools/match";
import NavButton from "../components/buttons/NavButton";

const Match = () => {
  const players = useSelector((state: Init) => state.players);
  const dispatch = useDispatch();

  // If everyone shot all the targets, move automatically to Results
  const NUMBER_OF_TRACKS = 2;
  const TOTAL_SHOTS_MATCH =
    NUMBER_OF_TARGETS_PER_TRACK * players.length * NUMBER_OF_TRACKS;
  const nShots = players.reduce(
    (total, currentPlayer) => (total += currentPlayer.shots.length),
    0
  );
  React.useEffect(() => {
    if (nShots === TOTAL_SHOTS_MATCH) {
      dispatch(changeView(ViewsEnum.RESULTS_MATCH));
    }
  }, [dispatch, nShots, TOTAL_SHOTS_MATCH]);

  return (
    <React.Fragment>
      <NavButton
        icon
        labelPosition="right"
        floated="right"
        view={ViewsEnum.RESULTS_MATCH}
      >
        Vai ai Risultati <Icon name="mail forward" />
      </NavButton>
      <Tab
        panes={players.map((player) => ({
          menuItem: player.name,
          render: () => (
            <React.Fragment>
              <br />
              TRACCIATO A
              <TablePlayerMatch player={player} track="A" />
              TRACCIATO B
              <TablePlayerMatch player={player} track="B" />
            </React.Fragment>
          ),
        }))}
      />
    </React.Fragment>
  );
};

export default Match;
