import { Dataset, OptionMeta, SelectMeta } from "@/datasets/models";
import {
  pivotedDataToFormMetadata,
  sourceDataToCmaPivotedData,
} from "@/datasets/converters";
import { applyFormRules } from "@/datasets/rules/apply.rules";
import { LocaleUtils } from "@/utils/locale-utils";
import { useContext } from "react";
import { SimulationFormContext } from "../SimulationForm/SimulationForm.context";
import "./SimulationFieldset.scss";
import { DropdownSelectorDisplay } from "./stateless/DropdownSelectorDisplay";
import { I18nStrings } from "@/datasets/models/i18nStrings.model";

interface IProp {
  sourceDataset: Dataset.Source;
}

export function SimulationFieldset({ sourceDataset }: IProp) {
  /**
   * SETUP
   */

  const formMeta = useContext(SimulationFormContext).formMeta;
  const setFormMeta = useContext(SimulationFormContext).setFormMeta;
  const pivotedData = useContext(SimulationFormContext).pivotedData;
  const setPivotedData = useContext(SimulationFormContext).setPivotedData;

  const datasetLabels = new LocaleUtils(
    ...LocaleUtils.geti18nStringsForDataset(
      sourceDataset.configuration.id,
      "questions"
    )
  ).getLabels();

  /**
   * HANDLERS
   */

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectMeta = formMeta.get(e.target.id);
    const selection = e.target.value;
    const cmaFieldWasChanged = e.target.id === "cma";

    if (selectMeta) {
      // Target actually exists, set new weights and selection

      selectMeta.selection = selection;
      selectMeta.weight = selectMeta.getFromPath(selection) as OptionMeta;

      if (cmaFieldWasChanged) {
        // We just changed the CMA, update the pivoted data to reflect the new CMA

        setPivotedData(sourceDataToCmaPivotedData(sourceDataset, selection));
      }

      if (pivotedData) {
        /**
         * Check that we're not too early.
         * If not, apply the form logic and place new form metadata based on the currently pivoted data.
         */

        setFormMeta(
          applyFormRules(
            pivotedData.configuration,
            pivotedDataToFormMetadata(pivotedData.data, formMeta)
          )
        );
      }
    }
  };

  /**
   * RENDER
   */

  // Visual iterator
  let i = 0;
  const dropdownSelectors: JSX.Element[] = [];

  formMeta.forEach((selectMeta) => {
    dropdownSelectors.push(
      <DropdownSelectorDisplay
        meta={selectMeta}
        index={i++}
        key={selectMeta.idKey}
        labels={datasetLabels as I18nStrings}
        onChange={handleChange}
      ></DropdownSelectorDisplay>
    );
  });

  return <div className="questions-wrapper">{dropdownSelectors}</div>;
}
