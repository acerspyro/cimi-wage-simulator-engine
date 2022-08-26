import { Dataset, Datatype } from "../models/configuration.model";

const PIVOT_KEY = "cma";

export function sourceDataToCmaPivotedData(
  source: Dataset.Source,
  cma?: string
): Dataset.Pivoted {
  const cmaSource = source.data[cma ? cma : Object.keys(source.data)[0]];

  /**
   * Replace CMA weights with a record of all CMAs and their weights
   */
  let result = Object.fromEntries(
    Object.entries(cmaSource).map(([key, val]) => [
      key,
      key === PIVOT_KEY ? getCmaWeightsFromSource(source.data) : val,
    ])
  ) as Datatype.Pivoted;

  /**
   * @todo move CMA to desired position.
   */

  return {
    kind: "PIVOTED",
    configuration: source.configuration,
    data: cma ? result : clearWeights(result),
  };
}

function getCmaWeightsFromSource(
  source: Datatype.Source
): Record<string, Array<number>> {
  return Object.fromEntries(
    Object.entries(source).map(([key, val]) => [key, val.cma])
  );
}

function clearWeights(pivoted: Datatype.Pivoted): Datatype.Pivoted {
  const walk = (elem: Object | Array<number>) => {
    if (Array.isArray(elem)) {
      return [];
    } else {
      return Object.fromEntries(
        Object.entries(elem).map((subelem): any => {
          return [subelem[0], walk(subelem[1])];
        })
      );
    }
  };

  const clearedWeights = walk(pivoted);

  if (clearedWeights["cma"] && !Array.isArray(clearedWeights["cma"])) {
    return clearedWeights as Datatype.Pivoted;
  } else {
    throw new Error("Pivoted data does not include CMA!");
  }
}
