import _ from "lodash";
import { en } from "../i18n/en.i18n";

interface IProp {
  labelKey: string;
  labels: typeof en.choice;
}

export const DropdownOptionDisplay = (props: IProp) => {
  const label = _.get(props.labels, props.labelKey, props.labelKey);

  return <option value={props.labelKey.split(".")[1]}>{label}</option>;
};
