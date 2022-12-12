import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DefaultProvider } from "./contexts/default";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <DefaultProvider>
    <App />
  </DefaultProvider>
);

reportWebVitals();
