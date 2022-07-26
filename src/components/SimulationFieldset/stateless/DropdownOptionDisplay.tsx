import _ from "lodash";
import { ConditionAction, ConditionEntry } from "../../../models/datasets/form";
import { en } from "../i18n/en.i18n";

interface IProp {
  key: string;
  labels: typeof en.choice;
  restriction: ConditionEntry;
}

export const DropdownOptionDisplay = (props: IProp) => {
  const label = _.get(props.labels, props.key, props.key);
  const disabled = props.restriction[props.key] === ConditionAction.DISABLE;

  return (
    <option value={props.key.split(".")[1]} disabled={disabled}>
      {label}
    </option>
  );
};
