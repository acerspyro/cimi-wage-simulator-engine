import { FormDataService } from "./service/form-data.service";
import { FormLogicService } from "./service/form-logic.service";
import React from "react";
import { FormConfiguration, DataTree } from "../../models/datasets/form";
import { LocaleUtils } from "../../utils/locale-utils";
import {
  ISurveyResponses,
  SimulatorStateContext,
} from "../../models/contexts/SimulatorStateContext";
import * as _ from "lodash";
import { en } from "./i18n/en.i18n";
import { fr } from "./i18n/fr.i18n";
import "./simulation-fieldset.scss";
import { DropdownSelectorDisplay } from "./stateless/DropdownSelectorDisplay";

interface IProp {
  weights: DataTree.Branch;
  configuration: FormConfiguration;
}

interface IState {
  surveyResponses: ISurveyResponses;
}

export class SimulationFieldset extends React.Component<IProp, IState> {
  declare context: ISurveyResponses;
  static contextType = SimulatorStateContext;

  private labels = new LocaleUtils(en, fr).getLabels();

  private formData: FormDataService;
  private formLogic: FormLogicService;

  private setSurveyResponse = (
    property: keyof ISurveyResponses,
    key: string | null,
    value: any
  ) => {
    if (key === null) {
      this.setState({
        surveyResponses: {
          ...this.state.surveyResponses,
          [property]: value,
        },
      });
    } else {
      this.setState({
        surveyResponses: {
          ...this.state.surveyResponses,
          [property]: {
            ...this.state.surveyResponses[property],
            [key]: value,
          },
        },
      });
    }
  };

  constructor(props: IProp) {
    super(props);

    this.state = {
      surveyResponses: this.context,
    };

    // Set up services
    this.formData = new FormDataService(
      this.props.weights,
      this.props.configuration,
      this.state.surveyResponses
    );
    this.formLogic = new FormLogicService(this.props.configuration.logic);

    // Set up empty selections
    this.formData.questions.forEach((_value, key) => {
      this.setSurveyResponse("selection", key, null);
    });

    // Set up baseline restrictions
    this.state.surveyResponses.restriction = this.formLogic.getRestrictions({});
  }

  private handleChange(e: React.ChangeEvent<HTMLSelectElement>, key: string) {
    this.setSurveyResponse("selection", key, e.target.value);
  }

  componentDidUpdate() {
    this.setSurveyResponse(
      "restriction",
      null,
      this.formLogic.getRestrictions(this.state.surveyResponses.selection)
    );

    if (this.state.surveyResponses.selection.cma) {
      const newWeightsState: ISurveyResponses["weights"] = {};

      Object.entries(this.state.surveyResponses.selection).forEach(
        ([key, value]) => {
          if (value !== null) {
            const weightValue = _.get(
              this.props.weights,
              key === "cma"
                ? `${value}.cma`
                : `${this.state.surveyResponses.selection.cma}.${key}.${value}`
            );

            if (Array.isArray(weightValue)) {
              newWeightsState[key] = weightValue;
            }
          }
        }
      );

      this.setSurveyResponse("weights", null, newWeightsState);
    }
  }

  render() {
    // Visual iterator
    let i = 0;
    const dropdownSelectors: JSX.Element[] = [];

    this.formData.questions.forEach((choiceNode, questionKey) =>
      dropdownSelectors.push(
        <DropdownSelectorDisplay
          index={i++}
          key={questionKey as keyof typeof en.question}
          labels={this.labels}
          restriction={this.state.surveyResponses.restriction}
          choiceNode={choiceNode}
          onChange={this.handleChange}
        ></DropdownSelectorDisplay>
      )
    );

    return <div className="questions-wrapper">{dropdownSelectors}</div>;
  }
}
