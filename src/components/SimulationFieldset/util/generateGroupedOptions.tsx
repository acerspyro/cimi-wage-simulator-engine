import { SelectMeta, OptionMeta, OptgroupMeta } from "@/datasets/models";
import { en } from "../i18n/en.i18n";
import { DropdownGroupDisplay } from "../stateless/DropdownGroupDisplay";
import { DropdownOptionDisplay } from "../stateless/DropdownOptionDisplay";

interface IProp {
  meta: SelectMeta;
  labels: typeof en;
}

export function displayGroupedOptions({ meta, labels }: IProp) {
  const walk = (
    optionOrOptgroup: OptionMeta | OptgroupMeta,
    walkedKey: string
  ) => {
    if (optionOrOptgroup instanceof OptionMeta) {
      return (
        <DropdownOptionDisplay
          key={`${optionOrOptgroup.idKey}`}
          labelKey={`${walkedKey}.${optionOrOptgroup.idKey}`}
          labels={labels.choice}
        ></DropdownOptionDisplay>
      );
    } else {
      return (
        <DropdownGroupDisplay
          key={`${optionOrOptgroup.idKey}`}
          labelKey={`${walkedKey}.${optionOrOptgroup.idKey}`}
          labels={labels}
          options={Array.from(optionOrOptgroup.values()).map((optgroup) =>
            walk(optgroup, `${walkedKey}.${optionOrOptgroup.idKey}`)
          )}
        ></DropdownGroupDisplay>
      );
    }
  };

  const renderStack: JSX.Element[] = [];

  meta.forEach((optionOrOptgroup) => {
    renderStack.push(walk(optionOrOptgroup, meta.idKey));
  });

  return renderStack;
}
