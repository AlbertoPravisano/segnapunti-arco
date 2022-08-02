import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Tab } from "semantic-ui-react";

import TablePlayerMatch from "../components/tables/TablePlayerMatch";
import { changeView, Init } from "../redux/reducer";
import { ViewsEnum } from "../tools/match";
import NavButton from "../components/buttons/NavButton";
import { useTranslation } from "react-i18next";

const Match = () => {
  const { players, configuration } = useSelector((state: Init) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const shotsPerTrack = configuration.shots_per_track;
  const tracks = configuration.tracks;
  const nTracks = tracks.length;

  React.useEffect(() => {
    // If everyone shot all the targets, move automatically to Results
    const TOTAL_SHOTS_MATCH = shotsPerTrack * players.length * nTracks;
    const nShots = players.reduce(
      (total, currentPlayer) => (total += currentPlayer.shots.length),
      0
    );

    if (nShots === TOTAL_SHOTS_MATCH) {
      dispatch(changeView(ViewsEnum.RESULTS_MATCH));
    }
  }, [dispatch, players, shotsPerTrack, nTracks]);

  return (
    <React.Fragment>
      <NavButton
        icon
        labelPosition="right"
        floated="right"
        view={ViewsEnum.RESULTS_MATCH}
      >
        {t("match.go_to_results")} <Icon name="mail forward" />
      </NavButton>
      <Tab
        panes={players.map((player, index) => ({
          menuItem: player.name,
          render: () => (
            <React.Fragment key={index}>
              <br />
              {tracks.map((track, index) => (
                <React.Fragment key={`${track}${index}`}>
                  {t("common.track")} {track}
                  <TablePlayerMatch
                    player={player}
                    configuration={configuration}
                    track={track}
                  />
                </React.Fragment>
              ))}
            </React.Fragment>
          ),
        }))}
      />
    </React.Fragment>
  );
};

export default Match;
