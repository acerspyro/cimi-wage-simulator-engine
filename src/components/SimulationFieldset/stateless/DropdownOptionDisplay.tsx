import { I18nStrings } from "@/datasets/models/i18nStrings.model";
import { LocaleUtils } from "@/utils/locale-utils";
import _ from "lodash";

interface IProp {
  pathKey: string;
  labels: I18nStrings;
}

export const DropdownOptionDisplay = ({ pathKey, labels }: IProp) => {
  /**
   * @fixme Removes the first part of the string as it represents the dropdown key.
   * Otherwise, this causes the linkage between dropdown and selection to break.
   */
  const value = pathKey.split(".").splice(1).join(".");

  return <option value={value}>{LocaleUtils.i18n(labels, pathKey)}</option>;
};
