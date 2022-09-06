import React from "react";
import ReactDOM from "react-dom";
import { Simulator } from "@components/Simulator/Simulator";
import "./style/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <Simulator />
  </React.StrictMode>,
  document.getElementById("cimi-simulator-root") as HTMLElement
);
