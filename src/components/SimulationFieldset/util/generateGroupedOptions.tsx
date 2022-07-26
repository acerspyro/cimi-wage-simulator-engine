import { ConditionEntry, OptionTree } from "../../../models/datasets/form";
import { en } from "../i18n/en.i18n";
import { DropdownGroupDisplay } from "../stateless/DropdownGroupDisplay";
import { DropdownOptionDisplay } from "../stateless/DropdownOptionDisplay";

export function generateGroupedOptions(
  choiceNode: OptionTree.Branch,
  labels: typeof en,
  restriction: ConditionEntry
) {
  const walk = (data: OptionTree.Branch, depth = 0, parentKey = "") => {
    parentKey = !!parentKey ? parentKey + "." : "";
    const renderStack: JSX.Element[] = [];

    if (data !== null) {
      Object.entries(data).forEach(([key, val]) => {
        if (val === null) {
          renderStack.push(
            <DropdownOptionDisplay
              key={`${parentKey}${key}`}
              labels={labels.choice}
              restriction={restriction}
            ></DropdownOptionDisplay>
          );
        } else {
          renderStack.push(
            <DropdownGroupDisplay
              key={key}
              labels={labels}
              options={walk(val, depth + 1, `${parentKey}${key}`)}
            ></DropdownGroupDisplay>
          );
        }
      });
    }

    return renderStack;
  };

  return walk(choiceNode);
}
