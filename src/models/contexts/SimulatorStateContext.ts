import React from "react";
import { ConditionEntry } from "../datasets/form";

export interface ISurveyResponses {
  selection: Record<string, string | null>;
  restriction: ConditionEntry;
  weights: Record<string, number[]>;
}

export const SimulatorStateContext = React.createContext<ISurveyResponses>({
  selection: {},
  restriction: {},
  weights: {},
});
