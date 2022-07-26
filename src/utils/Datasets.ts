import _ from "lodash";
import { ISurveyResponses } from "../models/contexts/SimulatorStateContext";
import {
  DataTree,
  FormConfiguration,
  OptionTree,
} from "../models/datasets/form";
import { generateZeroWeights } from "./dataParsing";

export class Datasets {
  private static memoizedSortOrder: Map<string, OptionTree.Node> = new Map();

  static getSortedQuestions(
    weightTree: OptionTree.Branch,
    pivotQuestion: FormConfiguration["pivotQuestion"]
  ) {
    if (this.memoizedSortOrder.size !== 0) {
      return this.memoizedSortOrder;
    }

    const pivotValues = Object.keys(weightTree[pivotQuestion.key]!);

    const reducer = (
      orderedKeys: Map<string, OptionTree.Node>,
      [key, _val]: [string, unknown],
      index: number
    ) => {
      // Move pivot question to requested index
      if (index === pivotQuestion.position) {
        pivotValues.sort();
        orderedKeys.set(
          pivotQuestion.key,
          Object.fromEntries(pivotValues.map((value) => [value, null]))
        );
      }

      // Re-insert question, unless question is pivot question
      if (key !== pivotQuestion.key) {
        orderedKeys.set(key, null);
      }

      return orderedKeys;
    };

    this.memoizedSortOrder = Object.entries(weightTree).reduce(
      reducer,
      new Map<string, OptionTree.Branch>()
    );

    return this.memoizedSortOrder;
  }

  static getQuestionWeights(
    rawDataTree: DataTree.Branch,
    configuration: FormConfiguration,
    surveyResponses: ISurveyResponses
  ): DataTree.Branch {
    const weightCount = configuration.weightCount;
    const pivotKey = configuration.pivotQuestion.key;

    // Default to zero weights if pivot value is null
    const newWeights = generateZeroWeights(rawDataTree, weightCount);

    // Get weights for each question
    if (surveyResponses.selection[pivotKey] !== null) {
      Object.entries(surveyResponses.selection)
        .filter(([key, _value]) => key !== null && key !== pivotKey)
        .forEach(
          ([key, value]) => (newWeights[key] = _.get(rawDataTree[key], value!))
        );

      newWeights[pivotKey] = _.get(
        rawDataTree[surveyResponses.selection[pivotKey]!],
        pivotKey
      );
    }

    return newWeights;
  }
}
