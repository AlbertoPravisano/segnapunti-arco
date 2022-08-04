import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Header, Icon, Input, Message } from "semantic-ui-react";

import { changeConfiguration, changeView, Init } from "../redux/reducer";
import {
  DEFAULT_CONF,
  isValidConfig,
  isValidPointsAndTentativesConfig,
  isValidShotsPerTrackConfig,
  isValidTracksConfig,
} from "../tools/configuration";
import { ViewsEnum } from "../tools/match";

const Configurations = () => {
  const configuration = useSelector((state: Init) => state.configuration);
  const [newConf, setNewConf] = React.useState(configuration);
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  React.useEffect(() => {
    if (isValidConfig(newConf)) {
      setError(false);
    } else {
      setError(true);
    }
  }, [newConf]);

  return (
    <React.Fragment>
      <Header as="h2">
        <Icon name="cogs" />
        <Header.Content>{t("configurations.header")}</Header.Content>
      </Header>
      <br />
      <Grid>
        {Object.entries(configuration).map((entry) => {
          const parameterInError =
            (entry[0] === "tracks" && !isValidTracksConfig(entry[1])) ||
            (entry[0] === "shots_per_track" &&
              !isValidShotsPerTrackConfig(entry[1])) ||
            !isValidPointsAndTentativesConfig(
              configuration.points,
              configuration.shots_per_tentative,
              configuration.tentatives
            );
          return (
            <Parameter
              key={entry[0]}
              entry={entry}
              error={parameterInError}
              updateParameter={(key, value) => {
                let conf: any = { ...newConf };
                conf[key] = value;
                setNewConf(conf);
              }}
            />
          );
        })}
      </Grid>
      <br />
      <br />
      {error && (
        <React.Fragment>
          <Message error>
            <Message.Header>
              {t("configurations.error_in_configuration")}
            </Message.Header>
            <Message.List
              items={[
                t("configurations.error_tracks"),
                t("configurations.error_shots_per_track"),
                t("configurations.error_tentatives"),
              ]}
            />
          </Message>
          <br />
          <br />
        </React.Fragment>
      )}
      <Button.Group floated="right">
        <Button
          negative
          onClick={() => dispatch(changeConfiguration({ ...DEFAULT_CONF }))}
        >
          {t("configurations.reset_configurations")}
        </Button>
        <Button.Or text="o" />
        <Button
          primary
          disabled={error}
          onClick={() => {
            dispatch(changeConfiguration({ ...newConf }));
            dispatch(changeView(ViewsEnum.HOME));
          }}
        >
          {t("configurations.update_configurations")}
        </Button>
      </Button.Group>
    </React.Fragment>
  );
};

export default Configurations;

interface Props {
  entry: [string, any];
  error: boolean;
  updateParameter: (key: string, value: any) => void;
}

const Parameter: React.FC<Props> = ({ entry, error, updateParameter }) => {
  const key = entry[0];
  const value = entry[1];
  const [state, setState] = React.useState(JSON.stringify(value));

  React.useEffect(() => {
    setState(JSON.stringify(value));
  }, [value]);

  const onHandleBlur = () => {
    let parsedValue;
    try {
      parsedValue = JSON.parse(state);
    } catch (error) {
      console.log("error parsing config parameter", error);
      parsedValue = JSON.stringify(value);
    }
    updateParameter(key, parsedValue);
  };

  return (
    <Grid.Row>
      <Grid.Column width="3">{key}:</Grid.Column>
      <Grid.Column width="10">
        <Input
          fluid
          value={state}
          error={error}
          onChange={(e) => setState(e.target.value)}
          onBlur={onHandleBlur}
        />
      </Grid.Column>
    </Grid.Row>
  );
};
