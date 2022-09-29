import { SelectMeta, OptionMeta, OptgroupMeta } from "@/datasets/models";
import { I18nStrings } from "@/datasets/models/i18nStrings.model";
import { DropdownGroupDisplay } from "../stateless/DropdownGroupDisplay";
import { DropdownOptionDisplay } from "../stateless/DropdownOptionDisplay";

interface IProp {
  meta: SelectMeta;
  labels: I18nStrings;
}

export function displayGroupedOptions({ meta, labels }: IProp) {
  const walk = (
    optionOrOptgroup: OptionMeta | OptgroupMeta,
    walkedKey: string
  ) => {
    const pathKey = `${walkedKey}.${optionOrOptgroup.idKey}`;

    if (optionOrOptgroup instanceof OptionMeta) {
      return (
        <DropdownOptionDisplay
          key={`${optionOrOptgroup.idKey}`}
          pathKey={pathKey}
          labels={labels}
        ></DropdownOptionDisplay>
      );
    } else {
      return (
        <DropdownGroupDisplay
          key={`${optionOrOptgroup.idKey}`}
          pathKey={pathKey}
          labels={labels}
          options={Array.from(optionOrOptgroup.values()).map((optgroup) =>
            walk(optgroup, pathKey)
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
