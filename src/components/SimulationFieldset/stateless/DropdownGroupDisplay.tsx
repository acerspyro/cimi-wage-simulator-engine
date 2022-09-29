import { I18nStrings } from "@/datasets/models/i18nStrings.model";
import { LocaleUtils } from "@/utils/locale-utils";
import _ from "lodash";
import { ReactNode } from "react";

interface IProp {
  pathKey: string;
  labels: I18nStrings;
  options: ReactNode;
}

export const DropdownGroupDisplay = ({ pathKey, labels, options }: IProp) => {
  return (
    <optgroup label={LocaleUtils.i18n(labels, pathKey)}>{options}</optgroup>
  );
};
