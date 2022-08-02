import { PlayersHistory } from "./match";

export const getHistoryFromStorage: () => PlayersHistory = () => {
  const history = localStorage.getItem("history");
  return history ? JSON.parse(history) : [];
};

export const setHistoryToStorage: (history: PlayersHistory) => void = (
  history
) => {
  localStorage.setItem("history", JSON.stringify(history));
};
