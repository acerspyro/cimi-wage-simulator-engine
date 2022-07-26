import {
  ConditionAction,
  ConditionEntry,
  QuestionNode,
} from "../../../models/datasets/form";
import { en } from "../i18n/en.i18n";
import { generateGroupedOptions } from "../util/generateGroupedOptions";

interface IProp {
  index: number;
  key: keyof typeof en.question;
  labels: typeof en;
  restriction: ConditionEntry;
  choiceNode: QuestionNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>, key: string) => void;
}

export const DropdownSelectorDisplay = (props: IProp) => {
  const disabled = props.restriction[props.key] === ConditionAction.DISABLE;

  return (
    <div className="field question" id={"csim-demographic-form-" + props.key}>
      <label
        htmlFor={props.key}
        className={"label " + disabled && "is-disabled"}
      >
        {props.index + 1}.{" "}
        {props.labels.question[props.key] ??
          `this.labels.question.${props.key}`}
      </label>
      <div className="select is-fullwidth">
        <select
          name={props.key}
          id={props.key}
          onChange={(e) => props.onChange(e, props.key)}
          disabled={disabled}
          required={!disabled}
        >
          <option value="" selected disabled hidden>
            --
          </option>
          {generateGroupedOptions(
            props.choiceNode,
            props.labels,
            props.restriction
          )}
        </select>
      </div>
    </div>
  );
};
