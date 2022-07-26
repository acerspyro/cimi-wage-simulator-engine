import * as wagesByDemographicData from "../../datasets/wages-by-demographic";
import * as discriminationByDemographicData from "../../datasets/discrimination-by-demographic";
import React from "react";
import { en } from "./i18n/en.i18n";
import { fr } from "./i18n/fr.i18n";
import { LocaleUtils } from "../../utils/locale-utils";
import { FormConfiguration, WeightTree } from "../../models/datasets/form";
import { SimulationForm } from "../SimulationForm/SimulationForm";

interface IState {
  activeTab: string;
}

interface IAvailableForms {
  id: string;
  weights: WeightTree;
  configuration: FormConfiguration;
}

// const DialogStateContext = React.createContext(false);

export class Simulator extends React.Component<void, IState> {
  private labels = new LocaleUtils(en, fr).getLabels();

  private availableForms: IAvailableForms[] = [
    {
      id: "wagesByDemographic",
      weights: wagesByDemographicData.dataWeights,
      configuration: wagesByDemographicData.formConfiguration,
    },
    {
      id: "discriminationByDemographic",
      weights: discriminationByDemographicData.dataWeights,
      configuration: discriminationByDemographicData.formConfiguration,
    },
  ];

  constructor(props: void) {
    super(props);

    this.state = {
      activeTab: this.availableForms[0].id,
    };
  }

  render() {
    return (
      <div className="container">
        {this.displayTabs()}
        {this.availableForms.map((form) => this.displayTabContent(form))}
      </div>
    );
  }

  private handleTabClick(id: string) {
    return () => {
      this.setState({
        activeTab: id,
      });
    };
  }

  private displayTabs() {
    const getActiveClass = (id: string) =>
      this.state.activeTab === id ? "is-active" : undefined;
    const getTabLabel = (id: string) =>
      (this.labels.tab as Record<IAvailableForms["id"], string>)[id];

    return (
      <div className="tabs is-centered">
        <ul>
          {this.availableForms.map((form) => (
            <li className={getActiveClass(form.id)}>
              <a href="about:blank" onClick={this.handleTabClick(form.id)}>
                {getTabLabel(form.id)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  private displayTabContent(form: IAvailableForms) {
    const hiddenClass =
      this.state.activeTab !== form.id ? "is-hidden" : undefined;

    return (
      <div className={hiddenClass}>
        <SimulationForm
          weights={form.weights}
          configuration={form.configuration}
        ></SimulationForm>
      </div>
    );
  }
}
