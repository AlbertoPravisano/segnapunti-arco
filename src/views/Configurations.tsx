import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Input } from "semantic-ui-react";

import { changeConfiguration, Init } from "../redux/reducer";
import { DEFAULT_CONF } from "../tools/configuration";

const Configurations = () => {
  const configuration = useSelector((state: Init) => state.configuration);
  const [newConf, setNewConf] = React.useState(configuration);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  return (
    <React.Fragment>
      <Grid>
        {Object.entries(configuration).map((entry, index) => (
          <Parameter
            key={index}
            entry={entry}
            updateParameter={(key, value) => {
              let conf: any = { ...newConf };
              conf[key] = value;
              setNewConf(conf);
            }}
          />
        ))}
      </Grid>
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
          onClick={() => dispatch(changeConfiguration({ ...newConf }))}
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
  updateParameter: (key: string, value: any) => void;
}

const Parameter: React.FC<Props> = ({ entry, updateParameter }) => {
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
          onChange={(e) => setState(e.target.value)}
          onBlur={onHandleBlur}
        />
      </Grid.Column>
    </Grid.Row>
  );
};
