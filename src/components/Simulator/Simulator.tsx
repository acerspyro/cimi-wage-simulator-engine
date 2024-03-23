import * as wagesData from "@datasets/wages";
import * as discriminationData from "@datasets/discrimination";
import { Dataset } from "@/datasets/models";
import { LocaleUtils } from "@/utils/locale-utils";
import { useState } from "react";
import { SimulationForm } from "../SimulationForm/SimulationForm";
import { en } from "./i18n/en.i18n";
import { fr } from "./i18n/fr.i18n";

const availableDatasets: Dataset.Source[] = [
  wagesData.default,
  // discriminationData.default, // Disabled per client's request.
];

export function Simulator() {
  /**
   * SETUP
   */

  const labels = new LocaleUtils(en, fr).getLabels();

  const [activeTab, setActiveTab] = useState(
    availableDatasets[0].configuration.id
  );

  /**
   * RENDER
   */

  const getActiveClass = (id: string) =>
    activeTab === id ? "is-active" : undefined;
  const getTabLabel = (id: string) =>
    (labels.tab as Record<Dataset.Pivoted["configuration"]["id"], string>)[id];

  const simulatorTabContent = (sourceDataset: Dataset.Source) => {
    const hiddenClass =
      activeTab !== sourceDataset.configuration.id ? "is-hidden" : undefined;

    return (
      <div key={sourceDataset.configuration.id} className={hiddenClass}>
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
            className={getActiveClass(dataset.configuration.id)}
            key={dataset.configuration.id}
          >
            <a
              href="about:blank"
              onClick={(e) => handleTabClick(e, dataset.configuration.id)}
            >
              {getTabLabel(dataset.configuration.id)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container">
      {/*<SimulatorTabs />*/ /* Disabled per client's request. */}
      {availableDatasets.map((form) => simulatorTabContent(form))}
    </div>
  );
}
