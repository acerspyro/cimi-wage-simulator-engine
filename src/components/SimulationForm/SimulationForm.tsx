import {
  sourceDataToCmaPivotedData,
  pivotedDataToFormMetadata,
} from "@/datasets/converters";
import { Dataset } from "@/datasets/models";
import { applyFormRules } from "@/datasets/rules/apply.rules";
import { LocaleUtils } from "@/utils/locale-utils";
import { useState } from "react";
import { Block, Content } from "react-bulma-components";
import { ResultsDialog } from "../ResultsDialog/ResultsDialog";
import { SimulationFieldset } from "../SimulationFieldset/SimulationFieldset";
import { en } from "./i18n/en.i18n";
import { fr } from "./i18n/fr.i18n";
import { SimulationFormContext } from "./SimulationForm.context";
import "./SimulationForm.scss";
import { NoticeDisplay } from "./stateless/NoticeDisplay";

interface IProp {
  sourceDataset: Dataset.Source;
}

export const SimulationForm = ({ sourceDataset }: IProp) => {
  /**
   * SETUP
   */

  const labels = new LocaleUtils(en, fr).getLabels();
  const datasetId = sourceDataset.configuration.id as keyof typeof en.datasets;

  const [isResultsShown, setResultsShown] = useState(false);
  const [pivotedData, setPivotedData] = useState(() =>
    sourceDataToCmaPivotedData(sourceDataset)
  );
  const [formMeta, setFormMeta] = useState(() =>
    applyFormRules(
      pivotedData.configuration,
      pivotedDataToFormMetadata(pivotedData.data)
    )
  );

  /**
   * HANDLERS
   */

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setResultsShown(true);

    e.preventDefault();
  };

  const handleHideResults = () => {
    setResultsShown(false);
  };

  /**
   * RENDER
   */

  const displayResultsButton = () => {
    return (
      <input
        className="button is-link is-large my-2"
        type="submit"
        value={labels.seeResults}
      />
    );
  };

  const formClass = "container" + (isResultsShown ? " is-blurred" : "");
  const resultsWrapperClass =
    "results-wrapper" + (isResultsShown ? "" : " is-invisible");

  return (
    <div className="form-wrapper">
      <div className="fieldset-wrapper">
        <Block>
          <NoticeDisplay labels={labels} datasetId={datasetId} />
        </Block>

        <Content>
          <strong className="has-text-primary">
            {labels.datasets[datasetId].formHint}
          </strong>
        </Content>

        <form
          className={formClass}
          id={pivotedData.configuration.id}
          onSubmit={(e) => handleSubmit(e)}
        >
          <SimulationFormContext.Provider
            value={{ formMeta, setFormMeta, pivotedData, setPivotedData }}
          >
            <SimulationFieldset
              sourceDataset={sourceDataset}
            ></SimulationFieldset>
          </SimulationFormContext.Provider>
          <div className="results-button">{displayResultsButton()}</div>
        </form>
      </div>

      <div className={resultsWrapperClass} id={pivotedData.configuration.id}>
        <SimulationFormContext.Provider
          value={{ formMeta, setFormMeta, pivotedData, setPivotedData }}
        >
          {
            <ResultsDialog
              configuration={pivotedData.configuration}
              onHideResults={handleHideResults}
            ></ResultsDialog>
          }
        </SimulationFormContext.Provider>
      </div>
    </div>
  );
};
