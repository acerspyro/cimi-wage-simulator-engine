import React from "react";
import {
  ISurveyResponses,
  SimulatorStateContext,
} from "../../models/contexts/SimulatorStateContext";
import { FormConfiguration, WeightTree } from "../../models/datasets/form";
import { LocaleUtils } from "../../utils/locale-utils";
import { ResultsDialog } from "../ResultsDialog/ResultsDialog";
import { SimulationFieldset } from "../SimulationFieldset/SimulationFieldset";
import { en } from "./i18n/en.i18n";
import { fr } from "./i18n/fr.i18n";
import "./simulation-form.scss";

interface IProp {
  weights: WeightTree;
  configuration: FormConfiguration;
}

interface IState {
  isResultsButtonEnabled: boolean;
  isResultsShown: boolean;
  surveyResponses: ISurveyResponses;
}

export class SimulationForm extends React.Component<IProp, IState> {
  declare context: ISurveyResponses;
  static contextType = SimulatorStateContext;

  private labels = new LocaleUtils(en, fr).getLabels();

  constructor(props: IProp) {
    super(props);

    this.state = {
      isResultsButtonEnabled: false,
      isResultsShown: false,
      surveyResponses: this.context,
    };
  }

  private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    this.setState({
      ...this.state,
      isResultsShown: true,
    });

    e.preventDefault();
  }

  private handleHideResults() {
    this.setState({
      ...this.state,
      isResultsShown: false,
    });
  }

  private displayResultsButton() {
    return (
      <input
        className="button is-link is-large my-2"
        type="submit"
        value={this.labels.seeResults}
      />
    );
  }

  render() {
    const formClass =
      "container" + (this.state.isResultsShown ? " is-blurred" : "");
    const resultsWrapperClass =
      "results-wrapper" + (this.state.isResultsShown ? "" : " is-invisible");

    return (
      <div className="form-wrapper">
        <form
          className={formClass}
          id={this.props.configuration.formId}
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <SimulatorStateContext.Provider value={this.state.surveyResponses}>
            <SimulationFieldset
              weights={this.props.weights}
              configuration={this.props.configuration}
            ></SimulationFieldset>
          </SimulatorStateContext.Provider>
          <div className="results-button">{this.displayResultsButton()}</div>
        </form>
        <div
          className={resultsWrapperClass}
          id={this.props.configuration.formId}
        >
          <SimulatorStateContext.Provider value={this.state.surveyResponses}>
            {
              <ResultsDialog
                configuration={this.props.configuration}
                isResultsShown={this.state.isResultsShown}
                onHideResults={this.handleHideResults}
              ></ResultsDialog>
            }
          </SimulatorStateContext.Provider>
        </div>
      </div>
    );
  }
}
