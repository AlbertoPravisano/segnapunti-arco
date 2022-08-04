import { PlayersHistory } from "../tools/match";
// import { Configuration, DEFAULT_CONF } from "./configuration";

export const getHistoryFromStorage: () => PlayersHistory = () => {
  const history = localStorage.getItem("history");
  return history ? JSON.parse(history) : [];
};

export const setHistoryToStorage = (history: PlayersHistory) => {
  localStorage.setItem("history", JSON.stringify(history));
};

// export const getConfigurationFromStorage: () => Configuration = () => {
//   const config = localStorage.getItem("config");
//   return config ? JSON.parse(config) : DEFAULT_CONF;
// };

// export const setConfigToStorage = (config: Configuration) => {
//   localStorage.setItem("config", JSON.stringify(config));
// };
