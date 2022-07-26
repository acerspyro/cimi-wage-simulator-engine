import React from "react";
import {
  ISurveyResponses,
  SimulatorStateContext,
} from "../../models/contexts/SimulatorStateContext";
import { FormConfiguration } from "../../models/datasets/form";
import { LocaleUtils } from "../../utils/locale-utils";
import { en } from "./i18n/en.i18n";
import { fr } from "./i18n/fr.i18n";
import "./ResultsDialog.scss";

interface IProp {
  configuration: FormConfiguration;
  onHideResults: () => void;
  isResultsShown: boolean;
}

interface IState {
  surveyResponses: ISurveyResponses;
}

export class ResultsDialog extends React.Component<IProp, IState> {
  declare context: ISurveyResponses;
  static contextType = SimulatorStateContext;

  private labels = new LocaleUtils(en, fr).getLabels();

  private compileData(index: number) {
    return Object.entries(this.state.surveyResponses.weights).reduce(
      (previous, [_key, value]) => previous + value[index],
      0
    );
  }

  private displayClosePopupButton() {
    return (
      <button className="button" onClick={() => this.props.onHideResults()}>
        {this.labels.closePopup}
      </button>
    );
  }

  private displayData() {
    const listItems = [];

    for (let i = 0; i < this.props.configuration.weightCount; i++) {
      listItems.push(<li>{this.compileData(i)}</li>);
    }

    return listItems;
  }

  render() {
    return (
      <div className="box">
        <h2>Your expected wage</h2>
        <ul>{this.displayData()}</ul>
        <div className="container is-flex is-justify-content-center">
          {this.displayClosePopupButton()}
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps: IProp) {
    if (prevProps.isResultsShown !== this.props.isResultsShown) {
      // Do something
    }
  }
}
