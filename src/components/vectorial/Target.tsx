import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Icon, Segment } from "semantic-ui-react";

interface Props {
  setScore: (value: number) => void;
  onRevert?: () => void;
}

const Target: React.FC<Props> = ({ setScore, onRevert }) => {
  const { t } = useTranslation("common");

  const onHandleClick = (score: number) => {
    window.navigator?.vibrate(200);
    setScore(score);
  };

  return (
    <Segment basic compact textAlign="center" style={{ margin: "0 auto" }}>
      <svg
        width="20em"
        height="20em"
        viewBox="0 0 210 210"
        style={{ display: "inherit" }}
      >
        <g>
          <path
            d="M 105,4.9998 C 160.2187,4.9998 204.9998,49.7808 204.9998,104.9998 C 204.9998,160.2185 160.2187,204.9996 105,204.9996 C 49.7808,204.9996 5,160.2185 5,104.9998 C 5,49.7806 49.781,4.9998 105,4.9998 L 105,4.9998 z"
            onClick={() => onHandleClick(2)}
            style={{
              fill: "#00ffff",
              stroke: "#000000",
              strokeWidth: 0.52899998,
            }}
          />
          <path
            d="M 105,44.9999 C 138.1312,44.9999 164.9999,71.8685 164.9999,105 C 164.9999,138.1312 138.1312,164.9999 105,164.9999 C 71.8685,164.9999 44.9999,138.1312 44.9999,105 C 44.9999,71.8685 71.8685,44.9999 105,44.9999 z"
            onClick={() => onHandleClick(1)}
            style={{
              fill: "red",
              stroke: "#000000",
              strokeWidth: 0.5291,
            }}
          />
          <path
            d="M 105,85 C 116.0437,85 125,93.9562 125,105 C 125,116.0437 116.0437,125 105,125 C 93.9562,125 85,116.0437 85,105 C 85,93.9562 93.9562,85 105,85 z"
            onClick={() => onHandleClick(0)}
            style={{
              fill: "yellow",
              stroke: "#000000",
              strokeWidth: 0.52920002,
            }}
          />
          <path
            d="M 105,100 C 107.7609,100 110,102.239 110,105 C 110,107.7609 107.7609,110 105,110 C 102.239,110 100,107.7609 100,105 C 100,102.239 102.239,100 105,100 z"
            onClick={() => onHandleClick(0)}
            style={{
              fill: "yellow",
              stroke: "#000000",
              strokeWidth: 0.35280001,
            }}
          />
        </g>
      </svg>
      {
        <Button
          disabled={onRevert === undefined}
          icon
          negative
          onClick={onRevert}
        >
          {t("buttons.revert")} <Icon name="reply" />
        </Button>
      }
      <Button onClick={() => onHandleClick(-1)}>
        {t("buttons.miss").toUpperCase()}
      </Button>
    </Segment>
  );
};

export default Target;
