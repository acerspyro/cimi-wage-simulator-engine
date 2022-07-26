import _ from "lodash";
import { ISurveyResponses } from "../../../../models/contexts/SimulatorStateContext";
import {
  FormConditions,
  ConditionEntry,
  ConditionAction,
  ConditionArithmetic,
} from "../../../../models/datasets/form";

const AND = "&&";
const OR = "||";

export class FormLogicService {
  constructor(private readonly formConditions: FormConditions) {}

  public getRestrictions(
    selectionState: ISurveyResponses["selection"]
  ): ConditionEntry {
    const restrictions: Record<string, string> = {};

    Object.keys(this.formConditions.conditions).forEach((key) => {
      restrictions[key] = this.getAction(key, selectionState);
    });

    return restrictions;
  }

  private getAction(
    target: string,
    selectionState: ISurveyResponses["selection"]
  ) {
    // Get conditions for the target
    const conditions: FormConditions = _.get(
      this.formConditions.conditions,
      target,
      undefined
    );

    // Apply default action, enabled by default
    let action = _.get(
      this.formConditions.defaults,
      target,
      ConditionAction.ENABLE
    );

    // For each possible action, check if condition exists and then verify if it is active
    if (conditions) {
      Object.values(ConditionAction)
        .filter((val) => Number.isInteger(val))
        .forEach((actionKey) => {
          if (conditions[actionKey]) {
            action = this.parseLogic(conditions[actionKey], selectionState)
              ? (actionKey as ConditionAction)
              : action;
          }
        });
    }

    return action;
  }

  private parseLogic(
    logic: ConditionArithmetic[],
    selectionState: ISurveyResponses["selection"]
  ): boolean {
    let val = false;
    let oper = null;

    logic.forEach((ar) => {
      if (Array.isArray(ar)) {
        val = this.parseLogic(ar, selectionState);
      } else if ([AND, OR].includes(ar)) {
        oper = ar;
      } else {
        const [field, value] = ar.split(".");
        const next = selectionState[field] === value; // Tries to compare value with key.value, no-no

        switch (oper) {
          case AND:
            val = val && next;
            break;
          case OR:
            val = val || next;
            break;
          default:
            val = next;
        }
      }
    });

    return val;
  }
}
