import * as wagesByDemographicData from "@datasets/wages-by-demographic";
import * as discriminationByDemographicData from "@datasets/discrimination-by-demographic";
import { Dataset } from "@/datasets/models";
import { LocaleUtils } from "@/utils/locale-utils";
import { useState } from "react";
import { SimulationForm } from "../SimulationForm/SimulationForm";
import { en } from "./i18n/en.i18n";
import { fr } from "./i18n/fr.i18n";

const availableDatasets: Dataset.Source[] = [
  wagesByDemographicData.default,
  discriminationByDemographicData.default,
];

export function Simulator() {
  /**
   * SETUP
   */

  const labels = new LocaleUtils(en, fr).getLabels();

  const [activeTab, setActiveTab] = useState(
    availableDatasets[0].configuration.formId
  );

  /**
   * RENDER
   */

  const getActiveClass = (id: string) =>
    activeTab === id ? "is-active" : undefined;
  const getTabLabel = (id: string) =>
    (labels.tab as Record<Dataset.Pivoted["configuration"]["formId"], string>)[
      id
    ];

  const simulatorTabContent = (sourceDataset: Dataset.Source) => {
    const hiddenClass =
      activeTab !== sourceDataset.configuration.formId
        ? "is-hidden"
        : undefined;

    return (
      <div key={sourceDataset.configuration.formId} className={hiddenClass}>
        <SimulationForm sourceDataset={sourceDataset}></SimulationForm>
      </div>
    );
  };

  const handleTabClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    formId: string
  ) => {
    setActiveTab(formId);

    e.preventDefault();
  };

  const SimulatorTabs = () => (
    <div className="tabs is-centered">
      <ul>
        {availableDatasets.map((dataset) => (
          <li
            className={getActiveClass(dataset.configuration.formId)}
            key={dataset.configuration.formId}
          >
            <a
              href="about:blank"
              onClick={(e) => handleTabClick(e, dataset.configuration.formId)}
            >
              {getTabLabel(dataset.configuration.formId)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container">
      <SimulatorTabs />
      {availableDatasets.map((form) => simulatorTabContent(form))}
    </div>
  );
}
