import { Datatype } from "../models/configuration.model";
import { FormMeta } from "../models/formDisplay.model";
import { OptgroupMeta } from "../models/optgroupMeta.model";
import { OptionMeta } from "../models/optionMeta.model";
import { SelectMeta } from "../models/selectMeta.model";

export function pivotedDataToFormMetadata(
  pivotedData: Datatype.Pivoted,
  formMeta = new FormMeta()
) {
  Object.keys(pivotedData).forEach((dataKey) => {
    if (formMeta.has(dataKey)) {
      updateSelectMetaWeights(
        pivotedData[dataKey] as Record<string, Datatype.Generic>,
        formMeta.get(dataKey)!
      );
    } else {
      formMeta.set(
        dataKey,
        new SelectMeta(
          dataKey,
          dataKey,
          generateSelectMetaChildren(pivotedData[dataKey])
        )
      );
    }
  });

  // Returning a new FormMeta to trigger re-render
  return new FormMeta(formMeta);
}

function generateSelectMetaChildren(data: Datatype.Generic) {
  const generateOptionMeta = (key: string, value: Array<number>) => {
    return new OptionMeta(key, key, value);
  };

  const generateOptgroupMeta = (
    key: string,
    value: Record<string, Array<number>>
  ) => {
    return new OptgroupMeta(
      key,
      key,
      Object.fromEntries(
        Object.entries(value).map((optionMetaKeyval) => [
          optionMetaKeyval[0],
          generateOptionMeta(...optionMetaKeyval),
        ])
      )
    );
  };

  return Object.fromEntries(
    Object.entries(data).map((unknownMetaKeyval) => [
      unknownMetaKeyval[0],
      Array.isArray(unknownMetaKeyval[1])
        ? generateOptionMeta(...(unknownMetaKeyval as [string, Array<number>]))
        : generateOptgroupMeta(
            ...(unknownMetaKeyval as [string, Record<string, Array<number>>])
          ),
    ])
  );
}

function updateSelectMetaWeights(
  data: Record<string, Datatype.Generic>,
  selectMeta: SelectMeta
) {
  const updateOptionMeta = (
    optionMeta: OptionMeta,
    optionData: Array<number>
  ) => optionMeta.splice(0, optionData.length, ...optionData);

  Array.from(selectMeta.values()).forEach((unknownMeta) => {
    if (unknownMeta instanceof OptionMeta) {
      updateOptionMeta(unknownMeta, data[unknownMeta.idKey] as Array<number>);
    } else {
      Array.from(unknownMeta.values()).forEach((optionMeta) => {
        updateOptionMeta(
          optionMeta,
          (data[unknownMeta.idKey] as Record<string, Datatype.Generic>)[
            optionMeta.idKey
          ] as Array<number>
        );
      });
    }
  });
}
