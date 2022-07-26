import _ from "lodash";
import { ReactNode } from "react";
import { en } from "../i18n/en.i18n";

interface IProp {
  key: string;
  labels: typeof en;
  options: ReactNode;
}

export const DropdownGroupDisplay = (props: IProp) => {
  const label = _.get(props.labels.choice, props.key, props.key);

  return <optgroup label={label}>{props.options}</optgroup>;
};
