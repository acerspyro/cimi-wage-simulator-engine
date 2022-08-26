import { ElementState, JSONLogic } from "../models/logic.model";
import { Dataset } from "../models/configuration.model";
import { FormMeta } from "../models/formDisplay.model";

export function applyFormRules(
  configuration: Dataset.Source["configuration"],
  oldFormDisplay: FormMeta
): FormMeta {
  const newFormDisplay = oldFormDisplay;
  const logicClauses = configuration.conditions.logic;

  Object.keys(logicClauses).forEach((logicClause) => {
    let elementState: ElementState | null = null;

    (
      Object.keys(logicClauses[logicClause]) as Array<keyof typeof ElementState>
    ).forEach((possibleState) => {
      if (elementState === null) {
        const result = parseJSONLogic(
          logicClauses[logicClause][possibleState]!,
          oldFormDisplay
        );

        if (result) {
          elementState = possibleState as ElementState;
        }
      }
    });

    if (newFormDisplay.has(logicClause)) {
      newFormDisplay.get(logicClause)!.elementState =
        elementState || getDefaultElementState(configuration, logicClause);
    }
  });

  return newFormDisplay;
}

/**
 * @todo Support more than implicit AND operators. Reason: Time constraints
 * @param jsonLogic
 * @param state
 */
function parseJSONLogic(jsonLogic: JSONLogic, formDisplay: FormMeta) {
  let result = true;

  Object.entries(jsonLogic).forEach(([logicEntryKey, logicEntryValue]) => {
    let selectMeta = formDisplay.get(logicEntryKey);

    // Compare current value for selector with value
    if (selectMeta !== undefined && !Array.isArray(jsonLogic)) {
      result = result && selectMeta.selection === logicEntryValue;
    } else throw new Error(`Select metadata not found: ${logicEntryKey}`);
  });

  return result;
}

function getDefaultElementState(
  configuration: Dataset.Source["configuration"],
  element: string
) {
  return configuration.conditions.default[element] || ElementState.ENABLED;
}
