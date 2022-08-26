import { FormMeta, Dataset } from "@/datasets/models";
import React from "react";

type ISimulationFormContext = {
  formMeta: FormMeta;
  setFormMeta: React.Dispatch<React.SetStateAction<FormMeta>>;
  pivotedData?: Dataset.Pivoted;
  setPivotedData: React.Dispatch<React.SetStateAction<Dataset.Pivoted>>;
};

export const SimulationFormContext =
  React.createContext<ISimulationFormContext>({
    formMeta: new FormMeta(),
    setFormMeta: (_value: React.SetStateAction<FormMeta>) => undefined,
    setPivotedData: (_value: React.SetStateAction<Dataset.Pivoted>) =>
      undefined,
  });
