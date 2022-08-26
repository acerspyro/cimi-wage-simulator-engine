import { SelectMeta, ElementState } from "@/datasets/models";
import { en } from "../i18n/en.i18n";
import { displayGroupedOptions } from "../util/generateGroupedOptions";

interface IProp {
  meta: SelectMeta<keyof typeof en.question>;
  index: number;
  labels: typeof en;
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
        {index + 1}.{" "}
        {labels.question[meta.labelKey] ??
          `this.labels.question.${meta.labelKey}`}
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
