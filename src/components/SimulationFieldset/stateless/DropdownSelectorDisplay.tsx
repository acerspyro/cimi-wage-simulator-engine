import { SelectMeta, ElementState } from "@/datasets/models";
import { I18nStrings } from "@/datasets/models/i18nStrings.model";
import { LocaleUtils } from "@/utils/locale-utils";
import { displayGroupedOptions } from "../util/generateGroupedOptions";

interface IProp {
  meta: SelectMeta;
  index: number;
  labels: I18nStrings;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DropdownSelectorDisplay = ({
  meta,
  index,
  labels,
  onChange,
}: IProp) => {
  const disabled = meta.elementState === ElementState.DISABLED;

  return (
    <div className="field question" id={"csim-demographic-form-" + meta.idKey}>
      <label
        htmlFor={meta.idKey}
        className={"label " + disabled && "is-disabled"}
      >
        {index + 1}. {LocaleUtils.i18n(labels, `${meta.idKey}.$`)}
      </label>
      <div className="select is-fullwidth">
        <select
          name={meta.idKey}
          id={meta.idKey}
          onChange={onChange}
          disabled={disabled}
          required={!disabled}
          defaultValue=""
        >
          <option value="" disabled hidden>
            --
          </option>
          {displayGroupedOptions({ meta, labels })}
        </select>
      </div>
    </div>
  );
};
