import _ from "lodash";

/**
 * Action taken by the condition.
 * Sorted by priority, highest to lowest.
 */
export enum ConditionAction {
  HIDE,
  DISABLE,
  ENABLE,
}

export type ConditionEntry = Record<string, ConditionAction>;
export type ConditionArithmetic = "&&" | "||" | string | ConditionArithmetic[];
export type FormConditions = {
  conditions?: Record<
    string,
    Partial<Record<ConditionAction, ConditionArithmetic[]>>
  >;
  defaults?: ConditionEntry;
};

export namespace DataTree {
  export type Node = Branch | Leaf;
  export type Branch = { [x: string]: Node };
  export type Leaf = number[];

  export const isBranch = (node: Node) => !Array.isArray(node);
  export const isLeaf = (node: Node) => Array.isArray(node);
}

export namespace OptionTree {
  export type Node = Branch | Leaf;
  export type Branch = { [x: string]: Node };
  export type Leaf = null;

  export const isBranch = (node: Node) => node !== null;
  export const isLeaf = (node: Node) => node === null;
}

export type FormConfiguration = {
  /** Name of the form */
  formId: string;

  /** Question whose response pivots the data */
  pivotQuestion: {
    key: string;
    position: number;
  };

  /** Conditional fields for the form */
  logic: FormConditions;

  /** Number of weights per entry */
  weightCount: number;
};
