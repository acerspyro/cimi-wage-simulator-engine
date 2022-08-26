import { Dataset, OptionMeta, SelectMeta } from "@/datasets/models";
import {
  pivotedDataToFormMetadata,
  sourceDataToCmaPivotedData,
} from "@/datasets/converters";
import { applyFormRules } from "@/datasets/rules/apply.rules";
import { LocaleUtils } from "@/utils/locale-utils";
import { useContext } from "react";
import { SimulationFormContext } from "../SimulationForm/SimulationForm.context";
import { en } from "./i18n/en.i18n";
import { fr } from "./i18n/fr.i18n";
import "./SimulationFieldset.scss";
import { DropdownSelectorDisplay } from "./stateless/DropdownSelectorDisplay";

interface IProp {
  sourceDataset: Dataset.Source;
}

export const SimulationFieldset = ({ sourceDataset }: IProp) => {
  /**
   * SETUP
   */

  const labels = new LocaleUtils(en, fr).getLabels();

  const formMeta = useContext(SimulationFormContext).formMeta;
  const setFormMeta = useContext(SimulationFormContext).setFormMeta;
  const pivotedData = useContext(SimulationFormContext).pivotedData;
  const setPivotedData = useContext(SimulationFormContext).setPivotedData;

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
        meta={selectMeta as SelectMeta<keyof typeof en.question>}
        index={i++}
        key={selectMeta.idKey}
        labels={labels}
        onChange={handleChange}
      ></DropdownSelectorDisplay>
    );
  });

  return <div className="questions-wrapper">{dropdownSelectors}</div>;
};
