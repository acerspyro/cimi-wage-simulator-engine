import { Dataset } from "@/datasets/models";
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
    switch (configuration.id) {
      case "discrimination": {
        return (
          <DiscriminationResults
            configuration={configuration}
            formMeta={formMeta}
            labels={labels.datatype.discrimination}
          ></DiscriminationResults>
        );
      }

      case "wages": {
        return (
          <WagesResults
            configuration={configuration}
            formMeta={formMeta}
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
