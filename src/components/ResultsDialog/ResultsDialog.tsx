import { Dataset, FormMeta, SelectMeta, ElementState } from "@/datasets/models";
import { LocaleUtils } from "@/utils/locale-utils";
import { useContext } from "react";
import { Hero } from "react-bulma-components";
import { SimulationFormContext } from "../SimulationForm/SimulationForm.context";
import { en } from "./i18n/en.i18n";
import { fr } from "./i18n/fr.i18n";
import "./ResultsDialog.scss";
import { DiscriminationResults } from "./stateless/DiscriminationResults";
import { WagesResults } from "./stateless/WagesResults";

interface IProp {
  configuration: Dataset.Pivoted["configuration"];
  onHideResults: () => void;
}

const compileData = (index: number, formMeta: FormMeta) => {
  return Array.from(formMeta.values()).reduce(
    (previous, selectMeta: SelectMeta) =>
      selectMeta.elementState === ElementState.ENABLED &&
      selectMeta.weight.length
        ? previous + selectMeta.weight[index]
        : previous,
    0
  );
};

export const ResultsDialog = ({ configuration, onHideResults }: IProp) => {
  /**
   * SETUP
   */

  const labels = new LocaleUtils(en, fr).getLabels();
  const formMeta = useContext(SimulationFormContext).formMeta;

  /**
   * RENDER
   */

  const displayData = () => {
    const compiledWeights = [];

    for (let i = 0; i < configuration.weightCount; i++) {
      compiledWeights.push(compileData(i, formMeta));
    }

    switch (configuration.id) {
      case "discrimination": {
        return (
          <DiscriminationResults
            calculatedWeights={compiledWeights}
            labels={labels.datatype.discrimination}
          ></DiscriminationResults>
        );
      }

      case "wages": {
        return (
          <WagesResults
            calculatedWeights={compiledWeights}
            labels={labels.datatype.wages}
          ></WagesResults>
        );
      }

      default:
        throw new Error("Invalid form ID given for results dialog");
    }
  };

  return (
    <Hero>
      <Hero.Body>
        {displayData()}
        <button
          className="button is-link is-large mt-6"
          onClick={() => onHideResults()}
        >
          {labels.closePopup}
        </button>
      </Hero.Body>
    </Hero>
  );
};
