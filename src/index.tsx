import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_it from "./translations/it/common.json";
import common_en from "./translations/en/common.json";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "it", // language to use
  resources: {
    it: {
      common: common_it,
    },
    en: {
      common: common_en, // 'common' is our custom namespace
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
