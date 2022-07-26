import { FormConfiguration, DataTree } from "../models/datasets/form";

export function generateZeroWeights(
  questionTree: DataTree.Branch,
  weightCount: FormConfiguration["weightCount"]
) {
  // Tuple size varies depending on type of data
  const zero: number[] = Array(weightCount).fill(0);

  const walk = (data: DataTree.Branch): DataTree.Branch =>
    Object.fromEntries(
      Object.entries(data).map(([key, val]) => [
        key,
        DataTree.isLeaf(val) ? zero : walk(val as DataTree.Branch),
      ])
    );

  return walk(questionTree);
}

type KVTuple<T> = [keyof T, T[keyof T]];

/**
 * Performs an array.map on an object
 * @param o Object to work on
 * @param callbackfn Callback for the map function
 * @param thisArg this for the map function
 * @returns Object
 */
export function mapObject<T extends {}>(
  o: T,
  callbackfn: (
    value: KVTuple<T>,
    index: number,
    array: KVTuple<T>[]
  ) => KVTuple<T>[],
  thisArg?: any
) {
  return Object.fromEntries(
    (Object.entries(o) as KVTuple<T>[]).map(callbackfn, thisArg)
  );
}
