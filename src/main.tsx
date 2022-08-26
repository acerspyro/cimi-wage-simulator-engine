import React from "react";
import ReactDOM from "react-dom/client";
import { Simulator } from "@components/Simulator/Simulator";
import "./style/main.scss";

ReactDOM.createRoot(
  document.getElementById("cimi-simulator-root") as HTMLElement
).render(
  <React.StrictMode>
    <Simulator />
  </React.StrictMode>
);
